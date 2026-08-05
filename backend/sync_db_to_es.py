from elasticsearch import Elasticsearch, helpers
import mysql.connector
from db.database import get_connection 

es = Elasticsearch(
    "http://localhost:9200",
    request_timeout=120
)
def sync_tickets_to_elasticsearch():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        query = """
            SELECT 
                t.ticket_id, 
                t.price, 
                t.status,
                t.match_id,
                m.start_time,
                st.name AS sport_name,
                ht.name AS home_team_name,
                at.name AS away_team_name,
                s.name AS stadium_name,
                v.name AS venue_name,
                c.name AS city_name,
                tt.ticket_type
            FROM ticket t
            JOIN `match` m ON t.match_id = m.match_id
            LEFT JOIN sport_type st ON m.sport_type_id = st.sport_type_id
            LEFT JOIN team ht ON m.home_team_id = ht.team_id
            LEFT JOIN team at ON m.away_team_id = at.team_id
            LEFT JOIN stadium s ON m.stadium_id = s.stadium_id
            LEFT JOIN venue v ON s.venue_id = v.venue_id
            LEFT JOIN city c ON v.city_id = c.city_id
            LEFT JOIN ticket_type tt ON t.ticket_type_id = tt.ticket_type_id
        """
        
        print("⏳ Fetching data from MySQL...")
        cursor.execute(query)
        tickets = cursor.fetchall()
        
        if not tickets:
            print("No tickets found in MySQL to sync.")
            return

        print(f" Found {len(tickets)} tickets. Preparing for Elasticsearch...")


        actions = []
        for ticket in tickets:
            
            if ticket["start_time"]:
                ticket["start_time"] = ticket["start_time"].isoformat()
            
        
            if ticket["price"]:
                ticket["price"] = float(ticket["price"])

            action = {
                "_index": "tickets",
                "_id": ticket["ticket_id"],
                "_source": ticket 
            }
            actions.append(action)

        # send the bulk request to Elasticsearch
        print(" Syncing to Elasticsearch...")
        print(es.ping())
        helpers.bulk(es,actions,request_timeout=120)
        
        print(f" Successfully synced {len(actions)} tickets to Elasticsearch!")

    except Exception as e:
        print(f" Error during sync: {e}")
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    sync_tickets_to_elasticsearch()
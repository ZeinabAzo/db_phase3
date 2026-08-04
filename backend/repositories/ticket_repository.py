from utils.es_client import get_es_client
from db.database import get_connection

def sync_single_ticket_to_es(ticket_id: int):
    """
    update or insert a single ticket into Elasticsearch based on its current state in MySQL.
    If the ticket is deleted in MySQL, it will be removed from Elasticsearch.
    """
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
                tt.ticket_type,
                CONCAT(u.first_name, ' ', u.last_name) AS spectator_name
            FROM ticket t
            JOIN `match` m ON t.match_id = m.match_id
            LEFT JOIN sport_type st ON m.sport_type_id = st.sport_type_id
            LEFT JOIN team ht ON m.home_team_id = ht.team_id
            LEFT JOIN team at ON m.away_team_id = at.team_id
            LEFT JOIN stadium s ON m.stadium_id = s.stadium_id
            LEFT JOIN venue v ON s.venue_id = v.venue_id
            LEFT JOIN city c ON v.city_id = c.city_id
            LEFT JOIN ticket_type tt ON t.ticket_type_id = tt.ticket_type_id
            LEFT JOIN reserve r ON t.ticket_id = r.ticket_id AND r.status IN ('confirmed', 'pending')
            LEFT JOIN users u ON r.user_id = u.user_id
            WHERE t.ticket_id = %s
        """
        
        cursor.execute(query, (ticket_id,))
        ticket_data = cursor.fetchone()
        
        if not ticket_data:
            # If the ticket does not exist in MySQL, remove it from Elasticsearch
            remove_ticket_from_es(ticket_id)
            return

        # Prepare the ticket data for Elasticsearch
        if ticket_data["start_time"]:
            ticket_data["start_time"] = ticket_data["start_time"].isoformat()
        
        if ticket_data["price"]:
            ticket_data["price"] = float(ticket_data["price"])

        # send the ticket data to Elasticsearch
        es = get_es_client()
        es.index(index="tickets", id=ticket_id, document=ticket_data)

    except Exception as e:
        print(f" ES Sync Error for ticket {ticket_id}: {e}")
    finally:
        cursor.close()
        connection.close()


def remove_ticket_from_es(ticket_id: int):
    """
    Remove a ticket from Elasticsearch if it no longer exists in MySQL.
    """
    try:
        es = get_es_client()
        es.delete(index="tickets", id=ticket_id, ignore=[404])
    except Exception as e:
        print(f"ES Delete Error for ticket {ticket_id}: {e}")
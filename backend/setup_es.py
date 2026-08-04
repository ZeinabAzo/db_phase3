from elasticsearch import Elasticsearch

# 1. Connect to the local Elasticsearch server
es = Elasticsearch("http://localhost:9200")

def setup_elasticsearch_indexes():
    """
    Creates the necessary Elasticsearch indexes with defined mappings
    based on the relational database schema.
    """
    
    # 2. Define the Mapping for the 'tickets' index
    # This flattens the ticket, match, team, stadium, and venue tables into one document
    tickets_mapping = {
        "mappings": {
            "properties": {
                # Exact match IDs (Keywords)
                "ticket_id": {"type": "integer"},
                "match_id": {"type": "integer"},
                
                # Ticket specifics
                "price": {"type": "double"},
                "status": {"type": "keyword"}, # e.g., 'available', 'reserved', 'sold'
                "ticket_type": {"type": "keyword"}, # e.g., 'VIP', 'Standard'
                
                # Match specifics
                "start_time": {"type": "date", "format": "strict_date_optional_time||epoch_millis"},
                "sport_name": {"type": "keyword"},
                
                # Searchable Text fields (with keyword sub-fields for sorting/aggregating)
                "home_team_name": {
                    "type": "text",
                    "fields": {"keyword": {"type": "keyword", "ignore_above": 256}}
                },
                "away_team_name": {
                    "type": "text",
                    "fields": {"keyword": {"type": "keyword", "ignore_above": 256}}
                },
                "stadium_name": {
                    "type": "text",
                    "fields": {"keyword": {"type": "keyword", "ignore_above": 256}}
                },
                "venue_name": {
                    "type": "text",
                    "fields": {"keyword": {"type": "keyword", "ignore_above": 256}}
                },
                "city_name": {
                    "type": "keyword"
                },
                
                # For reserved/sold tickets (mapped from user table)
                "spectator_name": {
                    "type": "text",
                    "fields": {"keyword": {"type": "keyword", "ignore_above": 256}}
                }
            }
        }
    }

    # 3. Create the 'tickets' index if it doesn't already exist
    index_name = "tickets"
    
    if not es.indices.exists(index=index_name):
        response = es.indices.create(index=index_name, body=tickets_mapping)
        print(f"Index '{index_name}' created successfully: {response}")
    else:
        print(f"Index '{index_name}' already exists.")

if __name__ == "__main__":
    # Run the setup
    setup_elasticsearch_indexes()
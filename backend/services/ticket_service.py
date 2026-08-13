from db.database import get_connection
import json
from cache.redis_client import get_redis
#from db.database import get_connection
from repositories.ticket_repository import get_tickets_by_match
from utils.es_client import get_es_client
def search_ticket(
    city=None,
    sport_type=None,
    venue=None,
    home_team=None,
    away_team=None,
    date=None,
    ticket_type=None,
    min_price=None,
    max_price=None,
    query=None,
):

    try:
        redis = get_redis()
        es = get_es_client()
        must_queries = []

        # City
        if city:
            must_queries.append({
                "match": {
                    "city_name": city
                }
            })

        # Sport type
        if sport_type:
            must_queries.append({
                "term": {
                    "sport_name": sport_type
                }
            })

        # Venue / Stadium
        if venue:
            must_queries.append({
                "match": {
                    "venue_name": venue
                }
            })

        # Home team
        if home_team:
            must_queries.append({
                "match": {
                    "home_team_name": home_team
                }
            })

        # Away team
        if away_team:
            must_queries.append({
                "match_phrase": {
                    "away_team_name": away_team
                }
            })

        # Ticket type
        if ticket_type:
            must_queries.append({
                "match": {
                    "ticket_type": ticket_type
                }
            })

        # Minimum price
        if min_price is not None:
            must_queries.append({
                "range": {
                    "price": {
                        "gte": min_price
                    }
                }
            })

        # Maximum price
        if max_price is not None:
            must_queries.append({
                "range": {
                    "price": {
                        "lte": max_price
                    }
                }
            })

        # General search
        if query:
            must_queries.append({
                "multi_match": {
                    "query": query,
                    "fields": [
                        "home_team_name",
                        "away_team_name",
                        "venue_name",
                        "stadium_name"
                    ],
                    "fuzziness": "AUTO"
                }
            })

        # Date
        if date:
            must_queries.append({
                "term": {
                    "start_time": date
                }
            })

        # Cache key
        cache_key = (
            f"search_ticket:"
            f"{city}:{sport_type}:{venue}:{home_team}:{away_team}:"
            f"{date}:{ticket_type}:{min_price}:{max_price}:{query}"
        )

        cached_data = redis.get(cache_key)

        if cached_data:
            return json.loads(cached_data)

        search_query = {
            "bool": {
                "must": must_queries,
                "filter": [
                    {
                        "term": {
                            "status": "available"
                        }
                    }
                ]
            }
        }

        response = es.search(
            index="tickets",
            query=search_query,
            sort=[
                {"start_time": "asc"},
                {"price": "asc"}
            ]
        )

        tickets = []

        for hit in response["hits"]["hits"]:
            tickets.append(hit["_source"])

        redis.setex(
            cache_key,
            300,
            json.dumps(tickets, default=str)
        )

        return tickets

    finally:
        pass

def get_ticket_details(ticket_id: int):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        query = """
            SELECT 
                t.ticket_id,
                t.price,
                t.status AS ticket_status,
                tt.ticket_type,
                tt.desc AS ticket_type_desc,
                
                -- date and time of match
                m.start_time,
                m.status AS match_status,
                st.name AS sport_type,
                st.rules AS sport_rules,
                
                -- teams
                ht.name AS home_team,
                at.name AS away_team,
                
                -- city, venue, address, std name, seat
                c.name AS city_name,
                v.name AS venue_name,
                v.address AS venue_address,
                std.name AS stadium_name,
                sec.name AS section_name,
                s.row_number,
                s.seat_number,
                s.seat_type,
                
                -- specials(feature و ticket_feature)
                (
                    SELECT GROUP_CONCAT(f.name SEPARATOR '، ')
                    FROM ticket_feature tf
                    JOIN feature f ON tf.feature_id = f.feature_id
                    WHERE tf.ticket_id = t.ticket_id
                ) AS special_features,
                
                -- remaining capacity
                (
                    SELECT COUNT(*)
                    FROM ticket t2
                    WHERE t2.match_id = m.match_id AND t2.status = 'available'
                ) AS remaining_capacity

            FROM ticket t
            LEFT JOIN ticket_type tt ON t.ticket_type_id = tt.ticket_type_id
            LEFT JOIN `match` m ON t.match_id = m.match_id
            LEFT JOIN sport_type st ON m.sport_type_id = st.sport_type_id
            LEFT JOIN team ht ON m.home_team_id = ht.team_id
            LEFT JOIN team at ON m.away_team_id = at.team_id
            LEFT JOIN seat s ON t.seat_id = s.seat_id
            LEFT JOIN section sec ON s.section_id = sec.section_id
            LEFT JOIN stadium std ON sec.stadium_id = std.stadium_id
            LEFT JOIN venue v ON std.venue_id = v.venue_id
            LEFT JOIN city c ON v.city_id = c.city_id
            WHERE t.ticket_id = %s
            LIMIT 1
        """

        cursor.execute(query, (ticket_id,))
        ticket = cursor.fetchone()

        if not ticket:
            return {
                "success": False,
                "message": "Ticket was not found"
            }

        return {
            "success": True,
            "ticket": ticket
        }

    finally:
        cursor.close()
        connection.close()


def get_match_tickets(match_id: int):
    
    tickets = get_tickets_by_match(match_id)


    return {
        "success": True,
        "tickets": tickets
    }


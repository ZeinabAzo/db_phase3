from db.database import get_connection
import json
from cache.redis_client import get_redis
from db.database import get_connection


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
):

    cursor = None

    try:
        data_connection = get_connection()
        redis = get_redis()

        cache_key = (
            f"search_ticket:"
            f"{city}:{sport_type}:{venue}:{home_team}:{away_team}:{date}:{ticket_type}:{min_price}:{max_price}"
        )

        cached_data = redis.get(cache_key)

        if cached_data:
            return json.loads(cached_data)

        cursor = data_connection.cursor(dictionary=True)

        query = """
            select
                t.ticket_id,
                t.price,
                t.status as ticket_status,

                tt.ticket_type,

                m.match_id,
                m.start_time,
                m.status as match_status,

                st.name as sport_type,

                ht.name as home_team,
                at.name as away_team,

                s.name as stadium,
                v.name as venue,
                c.name as city

            from ticket t

            inner join `match` m
                on t.match_id = m.match_id

            inner join sport_type st
                on m.sport_type_id = st.sport_type_id

            inner join team ht
                on m.home_team_id = ht.team_id

            inner join team at
                on m.away_team_id = at.team_id

            inner join stadium s
                on m.stadium_id = s.stadium_id

            inner join venue v
                on s.venue_id = v.venue_id

            inner join city c
                on v.city_id = c.city_id

            left join ticket_type tt
                on t.ticket_type_id = tt.ticket_type_id

            where t.status = 'available'
        """

        params = []

        if city:
            query += " and c.name = %s"
            params.append(city)

        if sport_type:
            query += " and st.name = %s"
            params.append(sport_type)

        if venue:
            query += " and v.name = %s"
            params.append(venue)

        if home_team:
            query += " and ht.name = %s"
            params.append(home_team)

        if away_team:
            query += " and at.name = %s"
            params.append(away_team)

        if date:
            query += " and date(m.start_time) = %s"
            params.append(date)

        if ticket_type:
            query += " and tt.ticket_type = %s"
            params.append(ticket_type)

        if min_price is not None:
            query += " and t.price >= %s"
            params.append(min_price)

        if max_price is not None:
            query += " and t.price <= %s"
            params.append(max_price)

        query += """
            order by
                m.start_time asc,
                t.price asc
        """

        cursor.execute(query, params)

        tickets = cursor.fetchall()



        redis.setex(
            cache_key,300,json.dumps(tickets, default=str)
        )

        return tickets

    finally:
        if cursor is not None:
            cursor.close()

        if 'data_connection' in locals() and data_connection is not None:
            data_connection.close()


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

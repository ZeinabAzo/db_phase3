from db.database import get_connection

def get_reservation_for_cancellation(reserve_id: int, user_id: int):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # get reserve information such as reserve id and ... joining from reserve to ticket and match tables.
        query = """
            SELECT 
                r.reserve_id,
                r.total_price,
                r.status AS reserve_status,
                m.start_time
            FROM reserve r
            JOIN ticket t ON r.ticket_id = t.ticket_id
            JOIN `match` m ON t.match_id = m.match_id
            WHERE r.reserve_id = %s AND r.user_id = %s
            LIMIT 1
        """
        
        cursor.execute(query, (reserve_id, user_id))
        return cursor.fetchone()

    finally:
        cursor.close()
        connection.close()
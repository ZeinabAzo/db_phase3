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
                m.start_time,
                rp.refund_policy_id,
                rp.name AS policy_name,
                rp.desc AS policy_desc
            FROM reserve r
            JOIN ticket t ON r.ticket_id = t.ticket_id
            JOIN `match` m ON t.match_id = m.match_id
            LEFT JOIN refund_policy rp ON t.refund_policy_id = rp.refund_policy_id
            WHERE r.reserve_id = %s AND r.user_id = %s
            LIMIT 1
        """
        
        cursor.execute(query, (reserve_id, user_id))
        return cursor.fetchone()

    finally:
        cursor.close()
        connection.close()


def cancel_reservation_and_free_ticket(reserve_id: int, user_id: int):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Find the reserve and ticket information for the given reserve_id and user_id
        cursor.execute("""
            SELECT ticket_id FROM reserve 
            WHERE reserve_id = %s AND user_id = %s AND status = 'confirmed'
        """, (reserve_id, user_id))
        
        reserve_data = cursor.fetchone()
        if not reserve_data:
            return False

        ticket_id = reserve_data["ticket_id"]

        # change the status of the reserve to 'cancelled'
        cursor.execute("""
            UPDATE reserve 
            SET status = 'cancelled' 
            WHERE reserve_id = %s
        """, (reserve_id,))

        # reset the status of the ticket to 'available'
        cursor.execute("""
            UPDATE ticket 
            SET status = 'available' 
            WHERE ticket_id = %s
        """, (ticket_id,))

        # transaction commit to save the changes in the database
        connection.commit()
        return True

    except Exception as e:
        # rollback the transaction in case of any error to maintain data integrity
        connection.rollback()
        raise e

    finally:
        cursor.close()
        connection.close()
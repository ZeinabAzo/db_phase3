from db.database import get_connection
from datetime import datetime, timedelta


def reserve_ticket(user_id, ticket_id):

    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary=True)

        cursor.execute(
            """
            select ticket_id, price, status
            from ticket
            where ticket_id = %s
            """,
            (ticket_id,)
        )

        ticket = cursor.fetchone()

        if not ticket:
            return {
                "success": False,
                "message": "Ticket doesn't exist"
            }

        if ticket["status"] != "available":
            return {
                "success": False,
                "message": "Ticket is not available"
            }

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()
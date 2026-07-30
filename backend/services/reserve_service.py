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

        created_at = datetime.now()
        expired_at = created_at + timedelta(minutes = 10)

        cursor.execute(
            """
            insert into reserve(user_id, ticket_id, total_price, status, created_at, expire_at)
            values(%s,%s,%s,%s,%s,%s) """
            ,(user_id, ticket_id, ticket["price"],"pending", created_at, expired_at),
        )

        cursor.execute(
            """
            update ticket
            set status = 'reserved'
            where ticket_id = %s """, (ticket_id,)
        )

        data_connection.commit()

        return{"success" : True, "message" :"Ticket reserved successfully" }

    except Exception as e:
        if "data_connection" in locals():
            data_connection.rollback()
        

        return{
            "success": False, "message" : "Failed to reserve ticket"
        }

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()
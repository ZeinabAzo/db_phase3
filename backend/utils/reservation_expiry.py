from db.database import get_connection
from datetime import datetime
from repositories.ticket_repository import sync_single_ticket_to_es 


def expire_old_reservations():

    connection = get_connection()
    cursor = connection.cursor()

    try:

        cursor.execute(
            """
            SELECT reserve_id, ticket_id
            FROM reserve
            WHERE status = 'pending'
            AND expire_at <= %s
            """,
            (datetime.now(),)
        )

        expired_reserves = cursor.fetchall()

        ticket_ids = []

        for reserve in expired_reserves:

            reserve_id = reserve[0]
            ticket_id = reserve[1]

            ticket_ids.append(ticket_id)

            cursor.execute(
                """
                UPDATE reserve
                SET status = 'expired'
                WHERE reserve_id = %s
                """,
                (reserve_id,)
            )

            cursor.execute(
                """
                UPDATE ticket
                SET status = 'available'
                WHERE ticket_id = %s
                """,
                (ticket_id,)
            )

        connection.commit()

        # Sync tickets with Elasticsearch
        for ticket_id in ticket_ids:
            try:
                sync_single_ticket_to_es(ticket_id)
            except Exception as e:
                print(f"Failed to sync ticket {ticket_id}: {e}")

    except Exception as e:

        connection.rollback()

        print(
            "Expire reservation error:",
            e
        )

    finally:

        cursor.close()
        connection.close()

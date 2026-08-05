from db.database import get_connection
from datetime import datetime

def get_cancelled_reserves():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            r.reserve_id,
            r.status,
            r.created_at,
            r.expire_at,

            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            u.phone,

            t.ticket_id,
            t.price,

            s.seat_id,
            s.row_number,
            s.seat_number,

            home.name AS home_team,
            away.name AS away_team,

            m.start_time

        FROM reserve r

        JOIN users u
            ON r.user_id = u.user_id

        JOIN ticket t
            ON r.ticket_id = t.ticket_id

        JOIN seat s
            ON t.seat_id = s.seat_id

        JOIN `match` m
            ON t.match_id = m.match_id

        JOIN team home
            ON m.home_team_id = home.team_id

        JOIN team away
            ON m.away_team_id = away.team_id

        WHERE r.status = %s

        ORDER BY r.created_at DESC
    """

    cursor.execute(query, ("cancelled",))

    reserves = cursor.fetchall()

    cursor.close()
    connection.close()

    return reserves

def get_all_payments():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT 
            p.payment_id,
            p.amount,
            p.payment_status,
            p.payment_method,
            p.transaction_id,
            p.paid_at,
            p.reservation_id,

            r.created_at AS reservation_created_at,
            r.confirmed_at AS reservation_confirmed_at,
            r.status AS reservation_status,

            r.user_id ,

            r.ticket_id 

        FROM payment p
        JOIN reserve r
            ON p.reservation_id = r.reserve_id

        ORDER BY p.paid_at DESC
    """

    cursor.execute(query)

    payments = cursor.fetchall()

    cursor.close()
    connection.close()

    return payments

def get_ticket_reports():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            rt.report_id,
            rt.description,
            rt.created_at,
            rt.status,
            rt.updated_at,
            rt.respond,

            u.user_id AS reporter_id,
            u.first_name AS reporter_name,
            u.last_name AS reporter_last_name,
            u.email AS reporter_email,

            t.ticket_id

        FROM report_about_ticket rt

        JOIN users u
            ON rt.reporter_id = u.user_id

        JOIN ticket t
            ON rt.ticket_id = t.ticket_id

        ORDER BY rt.created_at DESC;
    """

    cursor.execute(query)

    reports = cursor.fetchall()

    cursor.close()
    connection.close()

    return reports

def get_reserve_reports():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            rr.report_id,
            rr.description,
            rr.created_at,
            rr.status,
            rr.updated_at,
            rr.respond,

            u.user_id AS reporter_id,
            u.first_name AS reporter_name,
            u.last_name AS reporter_last_name,
            u.email AS reporter_email,

            r.reserve_id,
            r.status

        FROM report_about_reserve rr

        JOIN reserve r
            ON rr.reserve_id = r.reserve_id

        JOIN users u
            ON rr.reporter_id = u.user_id

        ORDER BY rr.created_at DESC
    """

    cursor.execute(query)

    reports = cursor.fetchall()

    cursor.close()
    connection.close()

    return reports

def get_reserve_by_id(
    reserve_id: int
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            r.reserve_id,
            r.status,
            r.created_at,
            r.expire_at,
            r.total_price,

            u.user_id,
            u.first_name,
            u.last_name,
            u.email,

            t.ticket_id,
            t.status AS ticket_status

        FROM reserve r

        JOIN users u
            ON r.user_id = u.user_id

        JOIN ticket t
            ON r.ticket_id = t.ticket_id

        WHERE r.reserve_id = %s
    """

    cursor.execute(query, (reserve_id,))

    reserve = cursor.fetchone()

    cursor.close()
    connection.close()

    return reserve

def cancel_reserve(
    reserve_id: int
):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        UPDATE reserve
        SET status = 'cancelled'
        WHERE reserve_id = %s
    """

    cursor.execute(query, (reserve_id,))
    connection.commit()

    cursor.close()
    connection.close()

def make_ticket_available(
    ticket_id: int
):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        UPDATE ticket
        SET status = 'available'
        WHERE ticket_id = %s
    """

    cursor.execute(query, (ticket_id,))
    connection.commit()

    cursor.close()
    connection.close()

def get_payment_by_reserve_id(
    reserve_id: int
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT *
        FROM payment
        WHERE reservation_id = %s
    """

    cursor.execute(query, (reserve_id,))

    payment = cursor.fetchone()

    cursor.close()
    connection.close()

    return payment

def create_refund(
    payment_id: int,
    amount: float,
    reason: str
):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO refund (
            amount,
            reason,
            payment_id
        )
        VALUES (%s, %s, %s)
    """

    cursor.execute(
        query,
        (
            amount,
            reason,
            payment_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

def expire_old_reserves():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:

        query = """
            SELECT ticket_id
            FROM reserve
            WHERE expire_at < NOW()
            AND status = 'pending'
        """

        cursor.execute(query)

        reserves = cursor.fetchall()

        ticket_ids = [
            reserve["ticket_id"]
            for reserve in reserves
        ]

        update_reserve_query = """
            UPDATE reserve
            SET status = 'expired'
            WHERE expire_at < NOW()
            AND status = 'pending'
        """

        cursor.execute(update_reserve_query)

        if ticket_ids:

            placeholders = ",".join(
                ["%s"] * len(ticket_ids)
            )

            update_ticket_query = f"""
                UPDATE ticket
                SET status = 'available'
                WHERE ticket_id IN ({placeholders})
            """

            cursor.execute(
                update_ticket_query,
                tuple(ticket_ids)
            )

        connection.commit()

        return len(ticket_ids)

    except Exception:

        connection.rollback()
        raise

    finally:

        cursor.close()
        connection.close()

def get_dashboard_stats_repository():

    connection = get_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    cursor.execute(
        "SELECT COUNT(*) AS total_users FROM users"
    )

    total_users = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) AS total_matches FROM `match`"
    )

    total_matches = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) AS total_reservations FROM reserve"
    )

    total_reservations = cursor.fetchone()

    cursor.execute(
        """
        SELECT
            COALESCE(
                SUM(amount),
                0
            ) AS total_revenue
        FROM payment
        WHERE payment_status='completed'
        """
    )

    total_revenue = cursor.fetchone()

    cursor.close()

    connection.close()

    return {

        "total_users":
            total_users["total_users"],

        "total_matches":
            total_matches["total_matches"],

        "total_reservations":
            total_reservations["total_reservations"],

        "total_revenue":
            total_revenue["total_revenue"]

    }

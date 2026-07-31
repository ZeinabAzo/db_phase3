from db.database import get_connection

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
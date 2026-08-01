from db.database import get_connection
from datetime import datetime, timedelta
from repositories.reserve_repository import get_reservation_for_cancellation, cancel_reservation_and_free_ticket


def reserve_ticket(user_id, ticket_id):
    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary=True)

        cursor.execute(
            """
            select reserve_id, status, expire_at
            from reserve
            where ticket_id = %s
            order by reserve_id desc
            limit 1
            """,
            (ticket_id,),
        )

        last_reserve = cursor.fetchone()

        
        if (
            last_reserve
            and last_reserve["status"] == "pending"
            and last_reserve["expire_at"] <= datetime.now()
        ):
            cursor.execute(
                """
                update reserve
                set status = 'expired'
                where reserve_id = %s
                """,
                (last_reserve["reserve_id"],),
            )

            cursor.execute(
                """
                update ticket
                set status = 'available'
                where ticket_id = %s
                """,
                (ticket_id,),
            )

            data_connection.commit()

        cursor.execute(
            """
            select ticket_id, price, status
            from ticket
            where ticket_id = %s
            """,
            (ticket_id,),
        )

        ticket = cursor.fetchone()

        if not ticket:
            return {
                "success": False,
                "message": "Ticket doesn't exist",
            }

        if ticket["status"] != "available":
            return {
                "success": False,
                "message": "Ticket is not available",
            }

        created_at = datetime.now()
        expire_at = created_at + timedelta(minutes=10)

        cursor.execute(
            """
            insert into reserve(user_id, ticket_id, total_price, status, created_at, expire_at)
            values(%s,%s,%s,%s,%s,%s)
            """,
            (
                user_id,
                ticket_id,
                ticket["price"],
                "pending",
                created_at,
                expire_at,
            ),
        )

        cursor.execute(
            """
            update ticket
            set status = 'reserved'
            where ticket_id = %s
            """,
            (ticket_id,),
        )

        data_connection.commit()

        return {
            "success": True,
            "message": "Ticket reserved successfully",
        }

    except Exception as e:
        if "data_connection" in locals():
            data_connection.rollback()

        return {
            "success": False,
            "message": "Failed to reserve ticket",
        }

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()


def active_reservations(user_id):
    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary=True)

        cursor.execute(
            """
            select r.reserve_id, r.ticket_id, r.total_price, r.created_at, r.expire_at, r.status,
                   t.price,
                   m.match_id, m.start_time,
                   home.name as home_team, away.name as away_team
            from reserve r

            inner join ticket t
            on r.ticket_id = t.ticket_id

            inner join `match` m
            on t.match_id = m.match_id

            inner join team home
            on m.home_team_id = home.team_id

            inner join team away
            on m.away_team_id = away.team_id

            where r.user_id = %s
              and r.status = 'pending'
              and r.expire_at > now()

            order by r.created_at desc
            """,
            (user_id,),
        )

        reservations = cursor.fetchall()

        return {
            "success": True,
            "data": reservations,
        }

    except Exception as e:
        return {
            "success": False,
            "message": "failed to get active reservation",
        }

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()


def reservation_history(user_id):
    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary=True)

        cursor.execute(
            """
            select
                r.reserve_id,
                r.ticket_id,
                r.total_price,
                r.created_at,
                r.confirmed_at,
                r.expire_at,
                r.status,
                t.price,
                m.match_id,
                m.start_time,
                home.name as home_team,
                away.name as away_team

            from reserve r

            inner join ticket t
            on r.ticket_id = t.ticket_id

            inner join `match` m
            on t.match_id = m.match_id

            inner join team home
            on home.team_id = m.home_team_id

            inner join team away
            on m.away_team_id = away.team_id

            where r.user_id = %s

            order by r.created_at desc
            """,
            (user_id,),
        )

        reservations = cursor.fetchall()

        return {
            "success": True,
            "data": reservations,
        }

    except Exception as e:
        return {
            "success": False,
            "message": "failed to get reservation history",
        }

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()



def calculate_cancellation_penalty(reserve_id: int, user_id: int):
    # get reserve info from database
    reservation = get_reservation_for_cancellation(reserve_id, user_id)
    
    if not reservation:
        return {"success": False, "message": "A reservation with this id was not found, or is not yours.", "status_code": 404}
        
    if reservation["reserve_status"] != "confirmed":
        return {"success": False, "message": "Only confirmed reservations can be cancelled.", "status_code": 400}

    # calculate the time left to the match
    start_time = reservation["start_time"]
    now = datetime.now()
    
    if start_time <= now:
        return {"success": False, "message": "The match has already started(or passed), and cancellation is not possible.", "status_code": 400}

    # calculate the time difference in hours
    time_difference = start_time - now
    hours_until_match = time_difference.total_seconds() / 3600

    # determine the penalty percentage based on the time left 
    if hours_until_match >= 48:
        penalty_percentage = 10  # more than 48 hours to the match: 10 percent
    elif hours_until_match >= 24:
        penalty_percentage = 30  # between 24 and 48 hrs : 30
    elif hours_until_match >= 12:
        penalty_percentage = 50  # between 12 and 24 hrs : 50 
    else:
        penalty_percentage = 100 # less than 12 hrs left : 100 

    total_price = float(reservation["total_price"])
    penalty_amount = int((total_price * penalty_percentage) / 100)
    refund_amount = int(total_price - penalty_amount)

    return {
        "success": True,
        "data": {
            "reserve_id": reserve_id,
            "total_price": total_price,
            "penalty_percentage": penalty_percentage,
            "penalty_amount": penalty_amount,
            "refund_amount": refund_amount,
            "rules": f"because the match is {hours_until_match:.2f} hours away, a {penalty_percentage}% penalty applies, which amounts to {penalty_amount} units. The refund amount will be {refund_amount} units."
        },
        "status_code": 200
    }


def cancel_ticket_and_refund(reserve_id: int, user_id: int):
    # chevk if it has the conditions to be cancelled
    penalty_check = calculate_cancellation_penalty(reserve_id, user_id)
    
    if not penalty_check["success"]:
        return penalty_check  # if not, return the error

    # otherwise just update db
    db_update_success = cancel_reservation_and_free_ticket(reserve_id, user_id)
    
    if not db_update_success:
        return {
            "success": False, 
            "message": "Error occurred while updating the database. Please try again later.", 
            "status_code": 500
        }

    # get the refund amount from the penalty check result
    refund_amount = penalty_check["data"]["refund_amount"]
    
    # if in the future we add some wallet, the adding to it part will be written here.

    return {
        "success": True,
        "message": f"Reservation cancelled successfully. Refund amount: {refund_amount} units.",
        "refund_amount": refund_amount,
        "status_code": 200
    }
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
            select 
            t.ticket_id , t.price, t.status, m.start_time
            from ticket t
            inner join `match` m
            on t.match_id = m.match_id
            where t.ticket_id = %s
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

        if ticket["start_time"] <= datetime.now():
            return{
                "success" : False, "message" : "match has already startted or finished. reservation is not allowed."
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



def purchased_tickets(user_id):
    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary = True)

        cursor.execute(
            """
            select 
            r.reserve_id, r.ticket_id, r.total_price, r.created_at, r.confirmed_at,
            t.price,
            m.match_id, m.start_time,
            home.name as home_team,
            away.name as away_team

            from reserve r
            inner join ticket t
            on r.ticket_id = t.ticket_id

            inner join `match` m
            on t.match_id = m.match_id

            inner join team home
            on m.home_team_id = home.team_id

            inner join team away
            on m.away_team_id = away.team_id

            where r.user_id =  %s and r.status ='confirmed'
            order by r.confirmed_at desc""", (user_id,)
        )

        tickets = cursor.fetchall()

        return{
            "success": True, "data":tickets
        }
    except Exception:
        return {"success" : False, "message": "failed to get purchased tickets"}
    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()


def _get_penalty_percentage(policy_id: int, hours_until_match: float) -> int:
    """
    Helper function to calculate the penalty percentage based on the cancellation policy
    and the remaining time. Returns the penalty percentage (a number between 0 and 100).
    """
    days_until_match = hours_until_match / 24
    
    # Default: 100% penalty (no refund)
    penalty_percentage = 100 

    if policy_id == 1:
        # 1: Full Refund (7 days before)
        if days_until_match >= 7: 
            penalty_percentage = 0

    elif policy_id == 2:
        # 2: Partial Refund 50% (3-7 days before event)
        if days_until_match >= 7: 
            penalty_percentage = 0  # Cancelled earlier than 7 days -> Full Refund
        elif 3 <= days_until_match < 7: 
            penalty_percentage = 50 # Cancelled within 3-7 days -> 50% Penalty

    elif policy_id == 3:
        # 3: Partial Refund 25% (1-3 days before event)
        if days_until_match >= 3: 
            penalty_percentage = 0  # Cancelled earlier than 3 days -> Full Refund
        elif 1 <= days_until_match < 3: 
            penalty_percentage = 75 # Cancelled within 1-3 days -> 75% Penalty (25% refund)

    elif policy_id == 4:
        # 4: No Refund
        penalty_percentage = 100

    elif policy_id == 5:
        # 5: Full Refund Until 24h
        if hours_until_match >= 24: 
            penalty_percentage = 0

    elif policy_id == 6:
        # 6: Conditional Full Refund (must be cancelled by admin)
        penalty_percentage = 100

    elif policy_id == 7:
        # 7: Premium Exchange Only (no monetary refund)
        penalty_percentage = 100

    elif policy_id == 8:
        # 8: Weather Dependent
        penalty_percentage = 100 

    elif policy_id == 9:
        # 9: Senior Citizen Refund (3 days before)
        if days_until_match >= 3: 
            penalty_percentage = 0

    elif policy_id == 10:
        # 10: Group Booking Refund (requires support team review)
        penalty_percentage = 100

    return penalty_percentage


def calculate_cancellation_penalty(reserve_id: int, user_id: int):
    # 1. Fetch reservation and ticket data from the database
    reservation = get_reservation_for_cancellation(reserve_id, user_id)
    
    if not reservation:
        return {
            "success": False, 
            "message": "Reservation not found or does not belong to you.", 
            "status_code": 404
        }
        
    if reservation["reserve_status"] != "confirmed":
        return {
            "success": False, 
            "message": "Only confirmed reservations can be considered for cancellation.", 
            "status_code": 400
        }

    # 2. Check the match time
    start_time = reservation["start_time"]
    now = datetime.now()
    
    if start_time <= now:
        return {
            "success": False, 
            "message": "The match time has passed and cancellation is no longer possible.", 
            "status_code": 400
        }

    # 3. Calculate remaining time
    time_difference = start_time - now
    hours_until_match = time_difference.total_seconds() / 3600

    policy_id = reservation.get("refund_policy_id")
    policy_name = reservation.get("policy_name") or "No specific cancellation policy"
    policy_desc = reservation.get("policy_desc") or ""

    # 4. Call the helper function to get the penalty percentage
    penalty_percentage = _get_penalty_percentage(policy_id, hours_until_match)

    # 5. Calculate amounts
    total_price = float(reservation["total_price"])
    penalty_amount = int((total_price * penalty_percentage) / 100)
    refund_amount = int(total_price - penalty_amount)

    return {
        "success": True,
        "data": {
            "reserve_id": reserve_id,
            "total_price": total_price,
            "policy_applied": policy_name,
            "policy_description": policy_desc,
            "penalty_percentage": penalty_percentage,
            "penalty_amount": penalty_amount,
            "refund_amount": refund_amount,
            "rules": f"Policy ({policy_name}): Since there are {int(hours_until_match)} hours left until the match, your penalty is {penalty_percentage}%."
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
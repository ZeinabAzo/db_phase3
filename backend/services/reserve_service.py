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
        expire_at = created_at + timedelta(minutes = 10)

        cursor.execute(
            """
            insert into reserve(user_id, ticket_id, total_price, status, created_at, expire_at)
            values(%s,%s,%s,%s,%s,%s) """
            ,(user_id, ticket_id, ticket["price"],"pending", created_at, expire_at),
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



def active_reservations(user_id):
    cursor = None

    try:
        data_connection = get_connection()
        cursor = data_connection.cursor(dictionary = True)

        cursor.execute(
            """
            select r.reserve_id, r.ticket_id, r.total_price, r.created_at, r.expire_at, r.status,
                   t.price,
                   m.match_id, m.start_time , 
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

            where r.user_id = %s and r.status = 'pending' and r.expire_at > now()
            order by r.created_at desc """, (user_id,)
        )

        reservations = cursor.fetchall()

        return {"success" : True, "data" : reservations}



    except Exception as e:
        return{
            "success" : False, "message" : "failde to get active reservation"
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
        cursor = data_connection.cursor(dictionary = True)

        cursor.execute(
            """
            select
            r.reserve_id, r.ticket_id, r.total_price, r.created_at, r.confirmed_at, r.expire_at, r.status, 
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
            on home.team_id = m.home_team_id

            inner join team away
            on m.away_team_id = away.team_id

            where r.user_id = %s

            order by r.created_at desc """, (user_id,)
        )

        reservations = cursor.fetchall()

        return{"success": True , "data" : reservations}

    except Exception as e:
        return{"success": False, "message" : "failed to get reservation history"}

    finally:
        if cursor:
            cursor.close()

        if "data_connection" in locals():
            data_connection.close()

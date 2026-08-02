from db.database import get_connection


def create_payment(
    amount: float,
    payment_method: str,
    transaction_id: str,
    reservation_id: int
):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO payment (
            amount,
            payment_status,
            payment_method,
            transaction_id,
            reservation_id
        )
        VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        amount,
        "pending",
        payment_method,
        transaction_id,
        reservation_id
    )

    cursor.execute(
        query,
        values
    )

    connection.commit()

    payment_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return payment_id

def get_payment_by_transaction_id(
    transaction_id: str
):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            payment_id,
            amount,
            payment_status,
            payment_method,
            transaction_id,
            reservation_id,
            paid_at
        FROM payment
        WHERE transaction_id = %s
    """

    cursor.execute(
        query,
        (transaction_id,)
    )

    payment = cursor.fetchone()

    cursor.close()
    connection.close()

    return payment

# i maged this 3 metod into one transaction called complete_payment_transaction
#------------------------------------------------
def update_payment_status(
    transaction_id: str,
    payment_status: str
):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        UPDATE payment
        SET payment_status = %s,
            paid_at = NOW()
        WHERE transaction_id = %s
    """

    cursor.execute(
        query,
        (
            payment_status,
            transaction_id
        )
    )

    connection.commit()

    updated = cursor.rowcount

    cursor.close()
    connection.close()

    return updated

# def confirm_reserve(
#     reserve_id: int
# ):

#     connection = get_connection()
#     cursor = connection.cursor()

#     query = """
#         UPDATE reserve
#         SET status = 'confirmed'
#         WHERE reserve_id = %s
#     """

#     cursor.execute(
#         query,
#         (reserve_id,)
#     )

#     connection.commit()

#     updated = cursor.rowcount

#     cursor.close()
#     connection.close()

#     return updated

# def mark_ticket_as_sold(
#     ticket_id: int
# ):

#     connection = get_connection()
#     cursor = connection.cursor()

#     query = """
#         UPDATE ticket
#         SET status = 'sold'
#         WHERE ticket_id = %s
#     """

#     cursor.execute(
#         query,
#         (ticket_id,)
#     )

#     connection.commit()

#     updated = cursor.rowcount

#     cursor.close()
#     connection.close()

#     return updated
#--------------------------------------------

def get_payment_by_id(
    payment_id: int
):

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

            r.user_id

        FROM payment p

        JOIN reserve r
            ON p.reservation_id = r.reserve_id

        WHERE p.payment_id = %s
    """

    cursor.execute(
        query,
        (payment_id,)
    )

    payment = cursor.fetchone()

    cursor.close()
    connection.close()

    return payment

def get_pending_payment_by_reservation_id(
    reservation_id: int
):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            payment_id,
            amount,
            payment_status,
            payment_method,
            transaction_id,
            reservation_id
        FROM payment
        WHERE reservation_id = %s
        AND payment_status = 'pending'
        LIMIT 1
    """

    cursor.execute(
        query,
        (reservation_id,)
    )

    payment = cursor.fetchone()

    cursor.close()
    connection.close()

    return payment



def complete_payment_transaction(
    transaction_id: str,
    reservation_id: int,
    ticket_id: int
):

    connection = get_connection()
    cursor = connection.cursor()

    try:

        payment_query = """
            UPDATE payment
            SET payment_status = 'completed',
                paid_at = NOW()
            WHERE transaction_id = %s
        """

        cursor.execute(
            payment_query,
            (transaction_id,)
        )


        reserve_query = """
            UPDATE reserve
            SET status = 'confirmed',
                confirmed_at = NOW(),
                updated_at = NOW()
            WHERE reserve_id = %s
        """

        cursor.execute(
            reserve_query,
            (reservation_id,)
        )


        ticket_query = """
            UPDATE ticket
            SET status = 'sold'
            WHERE ticket_id = %s
        """

        cursor.execute(
            ticket_query,
            (ticket_id,)
        )


        connection.commit()


    except Exception:

        connection.rollback()
        raise


    finally:

        cursor.close()
        connection.close()
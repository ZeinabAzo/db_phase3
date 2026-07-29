from db.database import get_connection

def get_user_by_identifier(
    identifier: str,
    identifier_type: str
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        if identifier_type == "phone":
            query = """
                SELECT
                    user_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    password_hash,
                    profile_image,
                    status,
                    created_at,
                    updated_at,
                    role_id,
                    city_id
                FROM users
                WHERE phone = %s
                LIMIT 1
            """
        else:
            query = """
                SELECT
                    user_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    password_hash,
                    profile_image,
                    status,
                    created_at,
                    updated_at,
                    role_id,
                    city_id
                FROM users
                WHERE email = %s
                LIMIT 1
            """

        cursor.execute(query, (identifier,))

        return cursor.fetchone()

    finally:
        cursor.close()
        connection.close()

def get_user_by_id(user_id: int):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        query = """
            SELECT
                user_id,
                first_name,
                last_name,
                email,
                phone,
                profile_image,
                status,
                created_at,
                updated_at,
                role_id,
                city_id
            FROM users
            WHERE user_id = %s
            LIMIT 1
        """

        cursor.execute(query, (user_id,))

        return cursor.fetchone()

    finally:
        cursor.close()
        connection.close()

def create_user(
    first_name: str,
    last_name: str,
    password_hash: str,
    identifier: str,
    identifier_type: str
):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        if identifier_type == "phone":
            query = """
                INSERT INTO users (
                    first_name,
                    last_name,
                    phone,
                    password_hash
                )
                VALUES (%s, %s, %s, %s)
            """
        else:
            query = """
                INSERT INTO users (
                    first_name,
                    last_name,
                    email,
                    password_hash
                )
                VALUES (%s, %s, %s, %s)
            """

        cursor.execute(
            query,
            (
                first_name,
                last_name,
                identifier,
                password_hash
            )
        )

        connection.commit()

        return cursor.lastrowid

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()        



def update_user(
    user_id: int,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    profile_image: str | None = None
):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        updates = []
        params = []

        # Add first_name to the UPDATE query
        # only if the user provided a new value
        if first_name is not None:
            updates.append("first_name = %s")
            params.append(first_name)

        # Add last_name to the UPDATE query
        # only if the user provided a new value
        if last_name is not None:
            updates.append("last_name = %s")
            params.append(last_name)

        # Add email to the UPDATE query
        # only if the user provided a new value
        if email is not None:
            updates.append("email = %s")
            params.append(email)

        # Add phone to the UPDATE query
        # only if the user provided a new value
        if phone is not None:
            updates.append("phone = %s")
            params.append(phone)

        # Add profile_image to the UPDATE query
        # only if the user provided a new value
        if profile_image is not None:
            updates.append("profile_image = %s")
            params.append(profile_image)

        # No fields were provided for update
        if not updates:
            return False

        # Always update the modification timestamp
        updates.append("updated_at = NOW()")

        query = f"""
            UPDATE users
            SET {", ".join(updates)}
            WHERE user_id = %s
        """

        # Add user_id for the WHERE condition
        params.append(user_id)

        cursor.execute(query, tuple(params))

        connection.commit()

        return cursor.rowcount > 0

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()
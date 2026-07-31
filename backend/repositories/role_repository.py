from db.database import get_connection

def get_role_id_by_name(role_name: str):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT role_id
        FROM role
        WHERE role_name = %s
    """

    cursor.execute(query, (role_name,))
    role = cursor.fetchone()

    cursor.close()
    connection.close()

    if role:
        return role["role_id"]

    return None
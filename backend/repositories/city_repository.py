from db.database import get_connection

def get_city_id_by_name(city_name: str):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT city_id
        FROM city
        WHERE name = %s
    """

    cursor.execute(query, (city_name,))
    city = cursor.fetchone()

    cursor.close()
    connection.close()

    if city:
        return city["city_id"]

    return None
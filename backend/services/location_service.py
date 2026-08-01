from db.database import get_connection


def get_locations():

    data_connection = get_connection()

    try:

        cursor = data_connection.cursor(dictionary=True)

        cursor.execute(

            "select distinct name from venue"
            
        )
        venues = cursor.fetchall()

        cursor.execute(
        
            "select distinct name from city"
                
        )

        cities = cursor.fetchall()

        

        return{
            "cities" : cities , "venues" : venues
        }

    finally:

        cursor.close()
        data_connection.close()
        
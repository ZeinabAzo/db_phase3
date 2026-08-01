from db.database import get_connection

def create_ticket_report(ticket_id: int, reporter_id: int, issue_type: str, description: str):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        # combine type and discription
        full_description = f"[{issue_type}] - {description}"
        
        # insert stuff into it + initialize it as pending 
        query = """
            INSERT INTO report_about_ticket (
                ticket_id,
                reporter_id,
                description,
                status
            )
            VALUES (%s, %s, %s, 'pending')
        """

        cursor.execute(query, (ticket_id, reporter_id, full_description))
        connection.commit()

        return cursor.lastrowid

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()


def create_reserve_report(reserve_id: int, reporter_id: int, issue_type: str, description: str):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        full_description = f"[{issue_type}] - {description}"
        
    
        query = """
            INSERT INTO report_about_reserve (
                reserve_id,
                reporter_id,
                description,
                status
            )
            VALUES (%s, %s, %s, 'pending')
        """

        cursor.execute(query, (reserve_id, reporter_id, full_description))
        connection.commit()

        return cursor.lastrowid

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()
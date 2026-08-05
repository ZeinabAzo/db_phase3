from datetime import datetime
from db.database import get_connection


def get_all_matches(page: int, page_size: int):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        offset = (page - 1) * page_size

        query = """
                SELECT
                    m.match_id,
                    m.match_data,
                    m.start_time,
                    m.status,
                    m.created_at,
                    m.updated_at,
                    m.`desc`,
                    m.sport_type_id,
                    m.home_team_id,
                    m.away_team_id,
                    m.stadium_id,
                    
                    st.name AS sport_type,
                    ht.name AS home_team,
                    at.name AS away_team,
                    s.name AS stadium
                FROM `match` AS m
                LEFT JOIN sport_type AS st
                    ON m.sport_type_id = st.sport_type_id
                LEFT JOIN team AS ht
                    ON m.home_team_id = ht.team_id
                LEFT JOIN team AS at
                    ON m.away_team_id = at.team_id
                LEFT JOIN stadium AS s
                    ON m.stadium_id = s.stadium_id
                ORDER BY m.start_time
                LIMIT %s OFFSET %s;
        """

        cursor.execute(
            query,
            (page_size, offset)
        )

        return cursor.fetchall()

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None and connection.is_connected():
            connection.close()




def count_matches():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT COUNT(*) AS total_matches
            FROM `match`;
        """

        cursor.execute(query)

        result = cursor.fetchone()

        return result["total_matches"]

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None and connection.is_connected():
            connection.close()


def create_match(
    match_data: str,
    start_time: datetime,
    status: str,
    desc: str,
    sport_type_id: int,
    home_team_id: int,
    away_team_id: int,
    stadium_id: int
):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO `match`
            (
                match_data,
                start_time,
                `status`,
                `desc`,
                sport_type_id,
                home_team_id,
                away_team_id,
                stadium_id
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(
            query,
            (
                match_data,
                start_time,
                status,
                desc,
                sport_type_id,
                home_team_id,
                away_team_id,
                stadium_id
            )
        )

        connection.commit()

        return cursor.lastrowid

    except Exception:
        if connection is not None:
            connection.rollback()

        raise

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None and connection.is_connected():
            connection.close()


def get_match_by_id(match_id: int):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                m.match_id,
                m.match_data,
                m.start_time,
                m.status,
                m.created_at,
                m.updated_at,
                m.`desc`,
                m.sport_type_id,
                m.home_team_id,
                m.away_team_id,
                m.stadium_id,

                st.name AS sport_type,
                ht.name AS home_team,
                at.name AS away_team,
                s.name AS stadium
            FROM `match` AS m
            LEFT JOIN sport_type AS st
                ON m.sport_type_id = st.sport_type_id
            LEFT JOIN team AS ht
                ON m.home_team_id = ht.team_id
            LEFT JOIN team AS at
                ON m.away_team_id = at.team_id
            LEFT JOIN stadium AS s
                ON m.stadium_id = s.stadium_id
            WHERE m.match_id = %s;
        """

        cursor.execute(query, (match_id,))

        return cursor.fetchone()

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None and connection.is_connected():
            connection.close()


def update_match(
    match_id: int,
    match_data: str | None = None,
    start_time: datetime | None = None,
    status: str | None = None,
    desc: str | None = None,
    sport_type_id: int | None = None,
    home_team_id: int | None = None,
    away_team_id: int | None = None,
    stadium_id: int | None = None
):
    connection = None
    cursor = None

    try:
        updates = []
        values = []

        if match_data is not None:
            updates.append("match_data = %s")
            values.append(match_data)

        if start_time is not None:
            updates.append("start_time = %s")
            values.append(start_time)

        if status is not None:
            updates.append("`status` = %s")
            values.append(status)

        if desc is not None:
            updates.append("`desc` = %s")
            values.append(desc)

        if sport_type_id is not None:
            updates.append("sport_type_id = %s")
            values.append(sport_type_id)

        if home_team_id is not None:
            updates.append("home_team_id = %s")
            values.append(home_team_id)

        if away_team_id is not None:
            updates.append("away_team_id = %s")
            values.append(away_team_id)

        if stadium_id is not None:
            updates.append("stadium_id = %s")
            values.append(stadium_id)

        if not updates:
            return False

        connection = get_connection()
        cursor = connection.cursor()

        query = f"""
            UPDATE `match`
            SET {", ".join(updates)}
            WHERE match_id = %s;
        """

        values.append(match_id)

        cursor.execute(query, tuple(values))

        connection.commit()

        return cursor.rowcount > 0

    except Exception:
        if connection is not None:
            connection.rollback()

        raise

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None and connection.is_connected():
            connection.close()

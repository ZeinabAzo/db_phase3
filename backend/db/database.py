import mysql.connector
from mysql.connector import pooling

from config import (
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
)

db_config = {
    "host": DB_HOST,
    "port": int(DB_PORT),
    "database": DB_NAME,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "pool_name": "sport_ticket_pool",
    "pool_size": 5
}

connection_pool = pooling.MySQLConnectionPool(
    **db_config
)


def get_connection():
    return connection_pool.get_connection()
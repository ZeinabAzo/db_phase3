import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

SECRET_KEY = os.getenv("SECRET_KEY")

# Email Config (OTP)
MAIL_USERNAME="Tickethub939@gmail.com"
MAIL_PASSWORD="narjggczpmcznnqz"
MAIL_FROM="Tickethub939@gmail.com"
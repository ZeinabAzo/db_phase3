import os
from dotenv import load_dotenv
from datetime import datetime, timedelta,timezone
from passlib.context import CryptContext
import jwt
import bcrypt


load_dotenv()

# use JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Hashes the user's plain text password using a secure hashing algorithm.
# Used before storing passwords in the database to avoid saving raw passwords.

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")

    salt = bcrypt.gensalt()

    hashed_password = bcrypt.hashpw(
        password_bytes,
        salt
    )

    return hashed_password.decode("utf-8")

# Creates a JWT access token containing the user's ID.
# The generated token is used for user authentication in protected API routes.
def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expire
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

# Decodes and validates a JWT access token.
# Extracts user information from the token and checks if the token is still valid.
def decode_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None

# hash password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# get simple password and hash it
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# verify password(check the hashed password with the simple one from database)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
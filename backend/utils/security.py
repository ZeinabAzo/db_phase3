import os
from dotenv import load_dotenv

load_dotenv()

# use JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


import os
import redis
from dotenv import load_dotenv

load_dotenv()

# read ports and redis host
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

#makes outputs pythonic strings :D
redis_db = redis.Redis(
    host=REDIS_HOST,
    port=int(REDIS_PORT or 6379),
    decode_responses=True
)

def get_redis():
    return redis_db
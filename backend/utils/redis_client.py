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
    port=REDIS_PORT, 
    decode_responses=True
)

def get_redis_client():
    return redis_db
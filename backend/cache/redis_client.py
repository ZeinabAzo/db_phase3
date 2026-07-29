import redis
from config import REDIS_HOST, REDIS_PORT

# تنظیم decode_responses=True باعث می‌شود دیتا به جای بایت، به صورت استرینگ خوانده شود
redis_db = redis.Redis(
    host=REDIS_HOST, 
    port=int(REDIS_PORT), 
    decode_responses=True
)

def get_redis():
    return redis_db

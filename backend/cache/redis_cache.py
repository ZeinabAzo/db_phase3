import json

from cache.redis_client import redis_db


def get_cache(key: str):
    value = redis_db.get(key)

    if value is None:
        return None

    return json.loads(value)


def set_cache(key: str, value, expire: int):
    serialized_value = json.dumps(value, default=str)

    redis_db.set(
        key,
        serialized_value,
        ex=expire
    )


def delete_cache(key: str):
    redis_db.delete(key)


def delete_matches_cache():
    keys = redis_db.keys("matches:*")

    if keys:
        redis_db.delete(*keys)


def delete_match_cache(match_id: int):
    redis_db.delete(f"match:{match_id}")

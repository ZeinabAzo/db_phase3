from repositories.user_repository import get_user_by_id
from repositories.user_repository import update_user
import json
from repositories.user_repository import get_user_by_id
from repositories.user_repository import update_user
from cache.redis_client import get_redis

def get_user_profile(user_id: int):

    redis_db = get_redis()

    # Create a unique Redis key for each user's profile
    cache_key = f"user_profile:{user_id}"

    # Try to get the user's profile from Redis Cache
    cached_user = redis_db.get(cache_key)

    if cached_user:
        return {
            "success": True,
            "user": json.loads(cached_user)
        }

    # If user data is not in Redis,
    # get it from MySQL database
    user = get_user_by_id(user_id)

    if user is None:
        return {
            "success": False,
            "message": "User not found"
        }

    # Convert the user dictionary to JSON
    # and save it in Redis
    redis_db.set(
        cache_key,
        json.dumps(user, default=str),
        ex=300
    )

    return {
        "success": True,
        "user": user
    }


def update_user_profile(
    user_id: int,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    profile_image: str | None = None
):
    # Update user information in MySQL
    updated = update_user(
        user_id=user_id,
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        profile_image=profile_image
    )

    if not updated:
        return {
            "success": False,
            "message": "User not found or no information was provided for update."
        }

    # Get Redis connection
    redis_db = get_redis()

    # Remove old cached user profile
    cache_key = f"user_profile:{user_id}"
    redis_db.delete(cache_key)

    return {
        "success": True,
        "message": "User profile updated successfully."
    }
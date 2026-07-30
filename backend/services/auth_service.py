import random
import json
from cache.redis_client import get_redis
from cache.redis_client import redis_db
from repositories.user_repository import (
    get_user_by_identifier,
    create_user
)
from repositories.city_repository import get_city_id_by_name
from repositories.role_repository import get_role_id_by_name
from utils.security import verify_password, create_access_token 

from utils.security import (
    hash_password,
    create_access_token
)
def generate_and_save_otp(identifier: str):
    # generating a random 6-digit OTP code
    otp_code = str(random.randint(100000, 999999))
    
    # redis connection
    redis_db = get_redis()
    
    #  3 minutes expiration time for the OTP code
    redis_db.set(name=f"otp:{identifier}", value=otp_code, ex=180) # key value output: otp:<phone or email> -> <otp_code>
    
    # printing the OTP code to the console for testing purposes
    print(f"\n=====================================")
    print(f"  OTP Code for {identifier} is: {otp_code}  ")
    print(f"  This code will expire in 3 minutes.  ")
    print(f"=====================================\n")
    
    return True

def verify_otp_code(
    identifier: str,
    identifier_type: str,
    otp_code: str
):
    stored_otp = redis_db.get(f"otp:{identifier}")

    if stored_otp is None:
        return {
            "success": False,
            "message": "OTP has expired or does not exist."
        }

    if stored_otp != otp_code:
        return {
            "success": False,
            "message": "Invalid OTP code."
        }

    # OTP is correct
    redis_db.delete(f"otp:{identifier}")

    # Check whether the user already exists
    existing_user = get_user_by_identifier(
        identifier=identifier,
        identifier_type=identifier_type
    )

    # Existing user -> Login
    if existing_user is not None:

        access_token = create_access_token(
            user_id=existing_user["user_id"]
        )

        return {
            "success": True,
            "registered": True,
            "user_id": existing_user["user_id"],
            "access_token": access_token,
            "token_type": "bearer",
            "message": "Login successful."
        }

    # New user -> Allow registration
    redis_db.set(
        f"otp_verified:{identifier}",
        "true",
        ex=300
    )

    return {
        "success": True,
        "registered": False,
        "message": "OTP verified successfully. Please complete registration."
    }



def register_user(
    identifier: str,
    identifier_type: str,
    first_name: str,
    last_name: str,
    password: str,
    city: str,
    role: str
):
    # 1. Check OTP verification
    otp_verified = redis_db.get(
        f"otp_verified:{identifier}"
    )

    if otp_verified is None:
        return {
            "success": False,
            "message": "OTP verification required"
        }

    # 2. Check if user already exists
    existing_user = get_user_by_identifier(
        identifier=identifier,
        identifier_type=identifier_type
    )

    if existing_user is not None:
        return {
            "success": False,
            "message": "User already exists"
        }

    # 3. Hash password
    password_hash = hash_password(password)

    city_id = get_city_id_by_name(city)
    # Default role is "user". Replace with a dynamic role when additional roles are supported.
    role_id = get_role_id_by_name("guest")

    if city_id is None:
        return {
            "success": False,
            "message": "City not found."
        }

    if role_id is None:
        return {
            "success": False,
            "message": "Role not found."
        }

    # 4. Create user
    user_id = create_user(
        first_name=first_name,
        last_name=last_name,
        password_hash=password_hash,
        identifier=identifier,
        identifier_type=identifier_type,
        city_id=city_id,
        role_id=role_id
    )

    # 5. Remove OTP verification
    redis_db.delete(
        f"otp_verified:{identifier}"
    )

    # 6. Create JWT
    access_token = create_access_token(
        user_id=user_id
    )

    return {
        "success": True,
        "registered": True,
        "user_id": user_id,
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Registration completed successfully."
    }




def login_user(identifier: str, identifier_type: str, password: str):
    # search user using identifier
    user = get_user_by_identifier(identifier, identifier_type)
    
    #user not found
    if not user:
        return {
            "success": False,
            "message": "No user with this email/phone number."
        }
    
    # is password correct?
    if not verify_password(password, user["password_hash"]):
        return {
            "success": False,
            "message": "wrong password"
        }
    
    # create JWT token to access user
    access_token = create_access_token(user["user_id"])
    
    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Logged in successfully."
    }

def signup_user(
    identifier: str,
    identifier_type: str,
    first_name: str,
    last_name: str,
    password: str,
    city: str,
    role: str
):
    
    #Check if user already exists
    existing_user = get_user_by_identifier(
    identifier=identifier,
    identifier_type=identifier_type
)

    if existing_user is not None:
        return {
            "success": False,
            "message": "User already exists"
        }
    
    #Hash password
    password_hash = hash_password(password)

    signup_data = {
    "identifier": identifier,
    "identifier_type": identifier_type,
    "first_name": first_name,
    "last_name": last_name,
    "password_hash": password_hash,
    "city": city,
    "role": role
    }

    # redis connection
    redis_db = get_redis()

    existing_signup = redis_db.get(f"signup:{identifier}")

    if existing_signup is not None:
        return {
            "success": False,
            "message": "You already requested an OTP. Please wait."
        }

    redis_db.set(
        f"signup:{identifier}",
        json.dumps(signup_data),
        ex=300
    )

    generate_and_save_otp(identifier)

    return {
    "success": True,
    "message": "OTP sent successfully"
    }

import json


def verify_signup(
    identifier: str,
    code: str
):

    redis_db = get_redis()

    otp = redis_db.get(f"otp:{identifier}")

    if otp is None:
        return {
            "success": False,
            "message": "OTP expired."
        }

    if otp != code:
        return {
            "success": False,
            "message": "Invalid OTP."
        }

    signup_data = redis_db.get(
        f"signup:{identifier}"
    )

    if signup_data is None:
        return {
            "success": False,
            "message": "Signup data not found."
        }

    signup_data = json.loads(signup_data)

    city_id = get_city_id_by_name(
        signup_data["city"]
    )

    forbidden_roles = ["admin","super_admin"]
    
    if signup_data["role"] in forbidden_roles:
        return {
            "success": False,
            "message": "You cannot choose this role."
        }

    role_id = get_role_id_by_name(
        signup_data["role"]
    )

    if city_id is None:
        return {
            "success": False,
            "message": "City not found."
        }

    if role_id is None:
        return {
            "success": False,
            "message": "Role not found."
        }
    
    user_id = create_user(
    first_name=signup_data["first_name"],
    last_name=signup_data["last_name"],
    password_hash=signup_data["password_hash"],
    identifier=signup_data["identifier"],
    identifier_type=signup_data["identifier_type"],
    city_id=city_id,
    role_id=role_id
)
    
    access_token = create_access_token(
    user_id=user_id
)
    
    redis_db.delete(f"otp:{identifier}")
    redis_db.delete(f"signup:{identifier}")

    return {
    "success": True,
    "registered": True,
    "user_id": user_id,
    "access_token": access_token,
    "token_type": "bearer",
    "message": "Registration completed successfully."
}

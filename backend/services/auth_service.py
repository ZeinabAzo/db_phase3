import random
from cache.redis_client import get_redis

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

def verify_otp_code(identifier: str, user_code: str):
    redis_db = get_redis()
    
    # read the code with key of identifier
    saved_code = redis_db.get(f"otp:{identifier}") 
    
    # check if there is a code or has been expired
    if not saved_code:
        return {"success": False, "message": "Verification code does not exist or has been expired"}
    
    # otherwise code exists:
    if saved_code == user_code:
        # The code is correct
        redis_db.delete(f"otp:{identifier}")
        return {"success": True, "message": "Verified seuccessfully"}
    else:
        return {"success": False, "message": "Wrong verification code"}


    
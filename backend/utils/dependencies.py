from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from utils.security import decode_access_token
from repositories.user_repository import get_role_by_user_id

# Creates an HTTP Bearer authentication scheme.
# It extracts the JWT token from the Authorization header.
security = HTTPBearer()

# Retrieves the currently authenticated user's ID from the JWT token.
# This function is used as a dependency in protected API routes.
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )

    return int(user_id)

def check_roles(
    user_id: int,
    allowed_roles: list[str]
):
    role = get_role_by_user_id(user_id)

    if role is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if role["role_name"] not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )

    return role


def get_current_admin(
    user_id: int = Depends(get_current_user)
) -> dict:

    role = check_roles(
        user_id,
        ["admin", "super_admin"]
    )

    return {
        "user_id": user_id,
        "role": role["role_name"]
    }
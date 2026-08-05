from fastapi import APIRouter, Query
from fastapi import HTTPException
from models.match import MatchListResponse,MatchUpdate,MatchCreate
from services import match_service



router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)


@router.get(
    "/",
    response_model=MatchListResponse
)
def get_all_matches(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100)
):
    return match_service.get_all_matches(
        page=page,
        page_size=page_size
    )

@router.post("/")
def create_match(match: MatchCreate):
    match_id = match_service.create_match(
        match_data=match.match_data,
        start_time=match.start_time,
        status=match.status,
        desc=match.desc,
        sport_type_id=match.sport_type_id,
        home_team_id=match.home_team_id,
        away_team_id=match.away_team_id,
        stadium_id=match.stadium_id
    )

    return {
        "message": "Match created successfully",
        "match_id": match_id
    }



@router.get("/{match_id}")
def get_match_by_id(match_id: int):
    match = match_service.get_match_by_id(match_id)

    if match is None:
        raise HTTPException(
            status_code=404,
            detail="Match not found"
        )

    return match

@router.patch("/{match_id}")
def update_match(match_id: int, match: MatchUpdate):
    updated_match = match_service.update_match(
        match_id=match_id,
        match_data=match.match_data,
        start_time=match.start_time,
        status=match.status,
        desc=match.desc,
        sport_type_id=match.sport_type_id,
        home_team_id=match.home_team_id,
        away_team_id=match.away_team_id,
        stadium_id=match.stadium_id
    )

    if updated_match is None:
        raise HTTPException(
            status_code=404,
            detail="Match not found"
        )

    if updated_match is False:
        raise HTTPException(
            status_code=400,
            detail="No fields to update"
        )

    return updated_match

from datetime import datetime

from pydantic import BaseModel


class MatchResponse(BaseModel):
    match_id: int
    match_data: str | None
    start_time: datetime
    status: str
    created_at: datetime
    updated_at: datetime
    desc: str | None

    sport_type_id: int
    home_team_id: int
    away_team_id: int
    stadium_id: int

    sport_type: str | None
    home_team: str | None
    away_team: str | None
    stadium: str | None



class MatchListResponse(BaseModel):
    items: list[MatchResponse]
    page: int
    page_size: int
    total: int
    total_pages: int

class MatchCreate(BaseModel): 
    match_data: str 
    start_time: datetime 
    status: str 
    desc: str 
    sport_type_id: int 
    home_team_id: int 
    away_team_id: int 
    stadium_id: int

class MatchUpdate(BaseModel):
    match_data: str | None = None
    start_time: datetime | None = None
    status: str | None = None
    desc: str | None = None
    sport_type_id: int | None = None
    home_team_id: int | None = None
    away_team_id: int | None = None
    stadium_id: int | None = None

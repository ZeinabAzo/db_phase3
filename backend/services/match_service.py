
from math import ceil

from cache.redis_cache import get_cache, set_cache
from repositories import match_repository
from cache.redis_cache import delete_matches_cache
from cache.redis_cache import delete_match_cache

from repositories import match_repository


MATCHES_CACHE_TTL = 300


def get_all_matches(page: int, page_size: int):
    cache_key = f"matches:page:{page}:size:{page_size}"

    cached_data = get_cache(cache_key)

    if cached_data is not None:
        return cached_data

    matches = match_repository.get_all_matches(
        page=page,
        page_size=page_size
    )

    total = match_repository.count_matches()

    total_pages = ceil(total / page_size)

    response = {
        "items": matches,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages
    }

    set_cache(
        key=cache_key,
        value=response,
        expire=MATCHES_CACHE_TTL
    )

    return response





def create_match(
    match_data: str,
    start_time,
    status: str,
    desc: str,
    sport_type_id: int,
    home_team_id: int,
    away_team_id: int,
    stadium_id: int
):
    match_id = match_repository.create_match(
        match_data=match_data,
        start_time=start_time,
        status=status,
        desc=desc,
        sport_type_id=sport_type_id,
        home_team_id=home_team_id,
        away_team_id=away_team_id,
        stadium_id=stadium_id
    )

    delete_matches_cache()

    return match_id

def get_match_by_id(match_id: int):
    cache_key = f"match:{match_id}"

    cached_match = get_cache(cache_key)

    if cached_match is not None:
        return cached_match

    match = match_repository.get_match_by_id(match_id)

    if match is None:
        return None

    set_cache(
        cache_key,
        match,
        expire=300
    )

    return match

def update_match(
    match_id: int,
    match_data: str | None = None,
    start_time=None,
    status: str | None = None,
    desc: str | None = None,
    sport_type_id: int | None = None,
    home_team_id: int | None = None,
    away_team_id: int | None = None,
    stadium_id: int | None = None
):
    existing_match = match_repository.get_match_by_id(match_id)

    if existing_match is None:
        return None

    updated = match_repository.update_match(
        match_id=match_id,
        match_data=match_data,
        start_time=start_time,
        status=status,
        desc=desc,
        sport_type_id=sport_type_id,
        home_team_id=home_team_id,
        away_team_id=away_team_id,
        stadium_id=stadium_id
    )

    if not updated:
        return False

    delete_match_cache(match_id)
    delete_matches_cache()

    return match_repository.get_match_by_id(match_id)

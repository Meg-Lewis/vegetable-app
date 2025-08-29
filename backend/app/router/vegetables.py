from fastapi import APIRouter

router = APIRouter(prefix="/vegetables")

@router.get("/")
async def get_plans():
    return [{"id": 1, "name": "Cucumber"}, {"id": 2, "name": "Spinach"}]
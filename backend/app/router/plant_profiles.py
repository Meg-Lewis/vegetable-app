from fastapi import APIRouter

router = APIRouter(prefix="/plans")

@router.get("/")
async def get_plans():
    return [{"id": 1, "name": "Tomatoes"}, {"id": 2, "name": "Carrots"}]

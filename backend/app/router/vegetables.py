from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import verify_firebase_token
from .. import models, schemas
from .. import dependencies
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()


# RETRIEVES ALL vegetables available. Used for selection list.
#--------------------------------------------------------------
@router.get("/all")
def get_all_vegetables(db: Session = Depends(get_db)):
    """
    Returns all vegetables in the database (for selection list).
    """
    try:
        all_vegetables = db.query(models.Vegetable).all()
        return [
            {"id": veg.id, "name": veg.name, "difficulty": veg.difficulty}
            for veg in all_vegetables
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch vegetables: {str(e)}")


# SAVES a user's selected vegetables
#--------------------------------------------------------------

class SelectedVegetablesRequest(BaseModel):
    vegetable_ids: List[int]

@router.post("/select")
def save_selected_vegetables(
    request: SelectedVegetablesRequest,
    uid: str = Depends(verify_firebase_token),
    db: Session = Depends(get_db),
):
    if not request.vegetable_ids:
        raise HTTPException(status_code=400, detail="No vegetables provided.")

    user = db.query(models.User).filter(models.User.firebase_uid == uid).first()
    if not user:
        user = models.User(firebase_uid=uid)
        db.add(user)
        db.commit()
        db.refresh(user)

    db.query(models.UserVegetable).filter(models.UserVegetable.user_id == user.id).delete()

    for vegetable_id in request.vegetable_ids:
        db.add(models.UserVegetable(user_id=user.id, vegetable_id=vegetable_id))

    db.commit()
    return {"message": "Vegetables saved successfully."}



# RETRIEVES a user's saved vegetables
#--------------------------------------------------------------
@router.get("/user", response_model=List[schemas.UserVegetableOut])
def get_user_vegetables(uid: str = Depends(verify_firebase_token), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.firebase_uid == uid).first()
    if not user:
        return []

    veg_names = (
        db.query(models.Vegetable.id, models.Vegetable.name)
        .join(models.UserVegetable, models.Vegetable.id == models.UserVegetable.vegetable_id)
        .filter(models.UserVegetable.user_id == user.id)
        .all()
    )

    return [{"id": veg[0], "name": veg[1]} for veg in veg_names]

# RETRIEVES all information for a specific vegetable by ID
#--------------------------------------------------------------
@router.get("/plant/{vegetable_id}")
def get_vegetable_details(vegetable_id: int, db: Session = Depends(get_db)):
    vegetable = db.query(models.Vegetable).filter(models.Vegetable.id == vegetable_id).first()
    if not vegetable:
        raise HTTPException(status_code=404, detail="Vegetable not found")

    return {
        "id": vegetable.id,
        "name": vegetable.name,
        "difficulty": vegetable.difficulty,
        "sunlight": vegetable.sunlight,
        "water": vegetable.water,
        "soil": vegetable.soil,
        "description": vegetable.description,
    }


# RESET all vegetable selection
#---------------------------------------------------------------
@router.delete("/users/vegetables/reset")
def reset_user_vegetables(
    current_user: dict = Depends(dependencies.get_current_user),
    db: Session = Depends(get_db)
):
    db.query(models.UserVegetable).filter(models.UserVegetable.user_id == current_user["uid"]).delete()
    db.commit()
    return {"message": "Your vegetable selection has been reset."}
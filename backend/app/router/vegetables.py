from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth import verify_firebase_token
from .. import models
from fastapi import HTTPException

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
@router.post("/select")
def save_selected_vegetables(selected_vegetables: list[dict], uid: str = Depends(verify_firebase_token), db: Session = Depends(get_db)):
    """
    selected_vegetables: [{"name": str, "difficulty": str}, ...]
    """
    if not selected_vegetables:
        raise HTTPException(status_code=400, detail="No vegetables provided for selection.")

    # Find or create the user
    user = db.query(models.User).filter(models.User.firebase_uid == uid).first()
    if not user:
        user = models.User(firebase_uid=uid)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Clear old selections to prevent duplicates
    db.query(models.UserVegetable).filter(models.UserVegetable.user_id == user.id).delete()

    # Add new selections
    for veg in selected_vegetables:
        if "name" not in veg or "difficulty" not in veg:
            continue  # skip invalid entries
        new_veg = models.UserVegetable(
            veg_name=veg["name"],
            difficulty=veg["difficulty"],
            user_id=user.id
        )
        db.add(new_veg)
    db.commit()
    return {"message": "Vegetables saved successfully."}


# RETRIEVES a user's saved vegetables
#--------------------------------------------------------------
@router.get("/user")
def get_user_vegetables(uid: str = Depends(verify_firebase_token), db: Session = Depends(get_db)):
    """
    Returns the vegetables previously selected by the logged-in user.
    """
    user = db.query(models.User).filter(models.User.firebase_uid == uid).first()
    if not user:
        return []  # no vegetables yet

    saved_vegetables = db.query(models.UserVegetable).filter(models.UserVegetable.user_id == user.id).all()
    return [
        {"id": veg.id, "name": veg.veg_name, "difficulty": veg.difficulty}
        for veg in saved_vegetables
    ]

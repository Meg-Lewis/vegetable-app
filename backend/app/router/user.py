from fastapi import Depends
from ..auth import verify_firebase_token
from ..database import get_db
from sqlalchemy.orm import Session
from ..models import User


@app.get("/user/vegetables")
def get_user_vegetables(
    uid: str = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.firebase_uid == uid).first()
    if not user:
        return []
    return [{"id": uv.id, "name": uv.name, "difficulty": uv.difficulty} for uv in user.vegetables]

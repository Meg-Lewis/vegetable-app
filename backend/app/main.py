from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models
from fastapi.middleware.cors import CORSMiddleware
from .router import vegetables, plant_profiles
from .database import engine, Base, get_db
from fastapi import Depends
from .auth import verify_firebase_token

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]  # React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(vegetables.router, prefix="/vegetables")
app.include_router(plant_profiles.router, prefix="/plants")

@app.get("/")
async def root():
    return {"message": "Vegetable API running and FastAPI + MySQL is working!"}


@app.get("/vegetables")
def get_vegetables(
    uid: str = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
    # uid is the Firebase user ID of the logged-in user
    vegetables = db.query(models.Vegetable).all()
    return [{"id": veg.id, "name": veg.name, "difficulty": veg.difficulty} for veg in vegetables]


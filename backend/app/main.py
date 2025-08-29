from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import vegetables, plant_profiles

app = FastAPI()

# CORS
origins = ["http://localhost:5173"]  # React dev server
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
    return {"message": "Vegetable API running"}

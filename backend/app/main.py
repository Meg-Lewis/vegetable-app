from fastapi import FastAPI
from routes import plans

app = FastAPI()
app.include_router(plans.router)

@app.get("/")
async def root():
    return {"message": "Backend running!"}

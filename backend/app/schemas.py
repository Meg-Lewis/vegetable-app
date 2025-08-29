from pydantic import BaseModel

class VegetableBase(BaseModel):
    name: str
    description: str | None = None

class VegetableCreate(VegetableBase):
    pass

class Vegetable(VegetableBase):
    id: int

    class Config:
        orm_mode = True

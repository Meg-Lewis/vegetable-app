# These define what the API sends/receives.

from pydantic import BaseModel
from typing import Optional, Tuple

class VegetableBase(BaseModel):
    name: str
    description: str | None = None

class VegetableCreate(VegetableBase):
    pass

class Vegetable(VegetableBase):
    id: int

    class Config:
        orm_mode = True

class UserVegetableOut(BaseModel):
    id: int
    name: str

class TodoCreate(BaseModel):
    text: str


class TodoResponse(BaseModel):
    id: int
    text: str
    completed: bool

    class Config:
        orm_mode = True


class TodoUpdate(BaseModel):
    completed: bool

class VegetableYearOverview(BaseModel):
    id: int
    name: str
    sow: Optional[Tuple[int, int]]
    plant: Optional[Tuple[int, int]]
    harvest: Optional[Tuple[int, int]]

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


# Vegetables available to the app
class Vegetable(Base):
    __tablename__ = "vegetables"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    sunlight = Column(String(50))
    water = Column(String(50))
    soil = Column(String(50))
    placements = Column(String(50))
    difficulty = Column(String(20))
    spacing_down = Column(Integer)
    spacing_across = Column(Integer)
    spacing_between = Column(Integer)
    fertilise = Column(Text)
    care_1 = Column(Text)
    care_2 = Column(Text)
    care_3 = Column(Text)
    sow = Column(String(50))
    plant_hoe = Column(String(50))
    harvest = Column(String(50))
    harvest_signs = Column(Text)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(50), unique=True, index=True)
    vegetables = relationship("UserVegetable", back_populates="user")

# Vegetables selected by users
class UserVegetable(Base):
    __tablename__ = "user_vegetables"
    id = Column(Integer, primary_key=True, index=True)
    vegetable_id = Column(Integer, ForeignKey("vegetables.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="vegetables")
    vegetable = relationship("Vegetable")  # To access all veg details.


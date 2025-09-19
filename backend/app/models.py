from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from .database import Base

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


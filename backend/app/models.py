from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class PlantPlan(Base):
    __tablename__ = "plant_plans"
    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    vegetable = Column(String)

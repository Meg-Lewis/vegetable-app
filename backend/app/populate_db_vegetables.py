import csv
from database import SessionLocal, engine
from models import Vegetable, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Open a new session
db = SessionLocal()

with open("vegetables.csv", newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        veg = Vegetable(
            name=row["name"],
            sunlight=row.get("sunlight"),
            water=row.get("water"),
            soil=row.get("soil"),
            placements=row.get("placements"),
            difficulty=row.get("difficulty"),
            spacing_down=int(row.get("spacing_down") or 0),
            spacing_across=int(row.get("spacing_across") or 0),
            spacing_between=int(row.get("spacing_between") or 0),
            fertilise=row.get("fertilise"),
            care_1=row.get("care_1"),
            care_2=row.get("care_2"),
            care_3=row.get("care_3"),
            sow=row.get("sow"),
            plant_hoe=row.get("plant_hoe"),
            harvest=row.get("harvest"),
            harvest_signs=row.get("harvest_signs")
        )
        db.add(veg)

db.commit()
db.close()

print("Seed data inserted successfully!")

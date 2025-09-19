from database import engine  # your SQLAlchemy engine
from models import Base      # your Base class from models.py

# Create all tables defined by SQLAlchemy models
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")

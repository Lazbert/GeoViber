import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.models import Country
from app.schemas import CountrySchema

Base.metadata.create_all(bind=engine)

app = FastAPI()

CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.get("/api/countries", response_model=list[CountrySchema])
def list_countries(db: Session = Depends(get_db)):
    countries = db.query(Country).order_by(Country.name).all()
    return [CountrySchema.model_validate(c) for c in countries]


@app.get("/api/countries/{slug}", response_model=CountrySchema)
def get_country(slug: str, db: Session = Depends(get_db)):
    country = db.query(Country).filter(Country.slug == slug).first()
    if country is None:
        raise HTTPException(status_code=404, detail="Country not found")
    return CountrySchema.model_validate(country)

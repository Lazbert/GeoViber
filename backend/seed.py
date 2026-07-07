"""Seed the countries table from the frontend's COUNTRIES const list.

Idempotent: existing rows (matched by slug) are left untouched, so re-running
this script will not create duplicates or raise errors.

Usage:
    python seed.py
"""

from app.database import Base, SessionLocal, engine
from app.models import Country

# Mirrors frontend/src/const.ts COUNTRIES (name, slug, countryCode).
# summary / meta_notes are left NULL for now, to be authored later.
COUNTRIES = [
    {"name": "Albania", "slug": "albania", "country_code": "AL"},
    {"name": "American Samoa", "slug": "american-samoa", "country_code": "AS"},
    {"name": "Andorra", "slug": "andorra", "country_code": "AD"},
    {"name": "Argentina", "slug": "argentina", "country_code": "AR"},
    {"name": "Australia", "slug": "australia", "country_code": "AU"},
    {"name": "Austria", "slug": "austria", "country_code": "AT"},
    {"name": "Bangladesh", "slug": "bangladesh", "country_code": "BD"},
    {"name": "Belgium", "slug": "belgium", "country_code": "BE"},
    {"name": "Bhutan", "slug": "bhutan", "country_code": "BT"},
    {"name": "Bolivia", "slug": "bolivia", "country_code": "BO"},
    {"name": "Botswana", "slug": "botswana", "country_code": "BW"},
    {"name": "Brazil", "slug": "brazil", "country_code": "BR"},
    {"name": "Bulgaria", "slug": "bulgaria", "country_code": "BG"},
    {"name": "Cambodia", "slug": "cambodia", "country_code": "KH"},
    {"name": "Canada", "slug": "canada", "country_code": "CA"},
    {"name": "Chile", "slug": "chile", "country_code": "CL"},
    {"name": "Christmas Island", "slug": "christmas-island", "country_code": "CX"},
    {"name": "Colombia", "slug": "colombia", "country_code": "CO"},
    {"name": "Costa Rica", "slug": "costa-rica", "country_code": "CR"},
    {"name": "Croatia", "slug": "croatia", "country_code": "HR"},
    {"name": "Curacao", "slug": "curacao", "country_code": "CW"},
    {"name": "Czech Republic", "slug": "czech-republic", "country_code": "CZ"},
    {"name": "Denmark", "slug": "denmark", "country_code": "DK"},
    {"name": "Dominican Republic", "slug": "dominican-republic", "country_code": "DO"},
    {"name": "Ecuador", "slug": "ecuador", "country_code": "EC"},
    {"name": "Estonia", "slug": "estonia", "country_code": "EE"},
    {"name": "Eswatini", "slug": "eswatini", "country_code": "SZ"},
    {"name": "Faroe Islands", "slug": "faroe-islands", "country_code": "FO"},
    {"name": "Finland", "slug": "finland", "country_code": "FI"},
    {"name": "France", "slug": "france", "country_code": "FR"},
    {"name": "Germany", "slug": "germany", "country_code": "DE"},
    {"name": "Ghana", "slug": "ghana", "country_code": "GH"},
    {"name": "Gibraltar", "slug": "gibraltar", "country_code": "GI"},
    {"name": "Greece", "slug": "greece", "country_code": "GR"},
    {"name": "Greenland", "slug": "greenland", "country_code": "GL"},
    {"name": "Guam", "slug": "guam", "country_code": "GU"},
    {"name": "Guatemala", "slug": "guatemala", "country_code": "GT"},
    {"name": "Hong Kong", "slug": "hongkong", "country_code": "HK"},
    {"name": "Hungary", "slug": "hungary", "country_code": "HU"},
    {"name": "Iceland", "slug": "iceland", "country_code": "IS"},
    {"name": "India", "slug": "india", "country_code": "IN"},
    {"name": "Indonesia", "slug": "indonesia", "country_code": "ID"},
    {"name": "Ireland", "slug": "ireland", "country_code": "IE"},
    {"name": "Isle of Man", "slug": "isle-of-man", "country_code": "IM"},
    {"name": "Israel", "slug": "israel", "country_code": "IL"},
    {"name": "Italy", "slug": "italy", "country_code": "IT"},
    {"name": "Japan", "slug": "japan", "country_code": "JP"},
    {"name": "Jersey", "slug": "jersey", "country_code": "JE"},
    {"name": "Jordan", "slug": "jordan", "country_code": "JO"},
    {"name": "Kazakhstan", "slug": "kazakhstan", "country_code": "KZ"},
    {"name": "Kenya", "slug": "kenya", "country_code": "KE"},
    {"name": "Kyrgyzstan", "slug": "kyrgyzstan", "country_code": "KG"},
    {"name": "Laos", "slug": "laos", "country_code": "LA"},
    {"name": "Latvia", "slug": "latvia", "country_code": "LV"},
    {"name": "Lebanon", "slug": "lebanon", "country_code": "LB"},
    {"name": "Lesotho", "slug": "lesotho", "country_code": "LS"},
    {"name": "Liechtenstein", "slug": "liechtenstein", "country_code": "LI"},
    {"name": "Lithuania", "slug": "lithuania", "country_code": "LT"},
    {"name": "Luxembourg", "slug": "luxembourg", "country_code": "LU"},
    {"name": "Madagascar", "slug": "madagascar", "country_code": "MG"},
    {"name": "Malaysia", "slug": "malaysia", "country_code": "MY"},
    {"name": "Malta", "slug": "malta", "country_code": "MT"},
    {"name": "Mexico", "slug": "mexico", "country_code": "MX"},
    {"name": "Monaco", "slug": "monaco", "country_code": "MC"},
    {"name": "Mongolia", "slug": "mongolia", "country_code": "MN"},
    {"name": "Montenegro", "slug": "montenegro", "country_code": "ME"},
    {"name": "Namibia", "slug": "namibia", "country_code": "NA"},
    {"name": "Nepal", "slug": "nepal", "country_code": "NP"},
    {"name": "Netherlands", "slug": "netherlands", "country_code": "NL"},
    {"name": "New Zealand", "slug": "new-zealand", "country_code": "NZ"},
    {"name": "Nigeria", "slug": "nigeria", "country_code": "NG"},
    {"name": "North Macedonia", "slug": "north-macedonia", "country_code": "MK"},
    {
        "name": "Northern Mariana Islands",
        "slug": "northern-mariana-islands",
        "country_code": "MP",
    },
    {"name": "Norway", "slug": "norway", "country_code": "NO"},
    {"name": "Oman", "slug": "oman", "country_code": "OM"},
    {"name": "Panama", "slug": "panama", "country_code": "PA"},
    {"name": "Peru", "slug": "peru", "country_code": "PE"},
    {"name": "Philippines", "slug": "philippines", "country_code": "PH"},
    {"name": "Poland", "slug": "poland", "country_code": "PL"},
    {"name": "Portugal", "slug": "portugal", "country_code": "PT"},
    {"name": "Puerto Rico", "slug": "puerto-rico", "country_code": "PR"},
    {"name": "Qatar", "slug": "qatar", "country_code": "QA"},
    {"name": "Romania", "slug": "romania", "country_code": "RO"},
    {"name": "Russia", "slug": "russia", "country_code": "RU"},
    {"name": "Rwanda", "slug": "rwanda", "country_code": "RW"},
    {"name": "San Marino", "slug": "san-marino", "country_code": "SM"},
    {
        "name": "São Tomé and Príncipe",
        "slug": "sao-tome-and-principe",
        "country_code": "ST",
    },
    {"name": "Senegal", "slug": "senegal", "country_code": "SN"},
    {"name": "Serbia", "slug": "serbia", "country_code": "RS"},
    {"name": "Singapore", "slug": "singapore", "country_code": "SG"},
    {"name": "Slovakia", "slug": "slovakia", "country_code": "SK"},
    {"name": "Slovenia", "slug": "slovenia", "country_code": "SI"},
    {"name": "South Africa", "slug": "south-africa", "country_code": "ZA"},
    {"name": "South Korea", "slug": "south-korea", "country_code": "KR"},
    {"name": "Spain", "slug": "spain", "country_code": "ES"},
    {"name": "Sri Lanka", "slug": "sri-lanka", "country_code": "LK"},
    {"name": "Sweden", "slug": "sweden", "country_code": "SE"},
    {"name": "Switzerland", "slug": "switzerland", "country_code": "CH"},
    {"name": "Taiwan", "slug": "taiwan", "country_code": "TW"},
    {"name": "Thailand", "slug": "thailand", "country_code": "TH"},
    {"name": "Tunisia", "slug": "tunisia", "country_code": "TN"},
    {"name": "Türkiye", "slug": "turkey", "country_code": "TR"},
    {"name": "Uganda", "slug": "uganda", "country_code": "UG"},
    {"name": "Ukraine", "slug": "ukraine", "country_code": "UA"},
    {"name": "United Arab Emirates", "slug": "uae", "country_code": "AE"},
    {"name": "United Kingdom", "slug": "uk", "country_code": "GB"},
    {"name": "United States", "slug": "usa", "country_code": "US"},
    {
        "name": "United States Virgin Islands",
        "slug": "us-virgin-islands",
        "country_code": "VI",
    },
    {"name": "Uruguay", "slug": "uruguay", "country_code": "UY"},
    {"name": "Vietnam", "slug": "vietnam", "country_code": "VN"},
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        inserted = 0
        skipped = 0
        for entry in COUNTRIES:
            existing = db.get(Country, entry["slug"])
            if existing is not None:
                skipped += 1
                continue
            db.add(Country(**entry))
            inserted += 1
        db.commit()
        print(
            f"Seed complete: inserted {inserted}, skipped {skipped} (already existed)."
        )
    finally:
        db.close()


if __name__ == "__main__":
    seed()

from __future__ import annotations

from sqlalchemy import String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Country(Base):
    __tablename__ = "countries"
    __table_args__ = (UniqueConstraint("slug", name="uq_countries_slug"),)

    slug: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    country_code: Mapped[str] = mapped_column(String, nullable=False)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    meta_notes: Mapped[str | None] = mapped_column(Text, nullable=True)

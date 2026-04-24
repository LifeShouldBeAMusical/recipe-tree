"""Base Ingredient Table"""

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase


class BaseIngredientModel(ModelBase):
    """Base Ingredient Table"""

    __tablename__ = "base_ingredient"

    id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column("title", String, nullable=False, unique=True)

    components: Mapped[list["ComponentModel"]] = relationship(  # type: ignore
        back_populates="ingredient",
        lazy="selectin",
    )

"""Base Ingredient Table"""

from typing import Optional

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.base_ingredient_category_model import BaseIngredientCategoryModel


# pylint: disable-next=too-few-public-methods
class BaseIngredientModel(ModelBase):
    """Base Ingredient Table"""

    __tablename__ = "base_ingredient"

    id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column("title", String, nullable=False, unique=True)
    category_id: Mapped[Optional[int]] = mapped_column(
        "base_ingredient_category_id",
        ForeignKey(
            "base_ingredient_category.id", None, False, "foreign_ingredient_category_id"
        ),
        nullable=True,
    )

    components: Mapped[list["ComponentModel"]] = relationship(  # type: ignore
        back_populates="ingredient",
        lazy="selectin",
    )
    category: Mapped[BaseIngredientCategoryModel] = relationship(
        # back_populates="ingredients",
        primaryjoin=category_id == BaseIngredientCategoryModel.id,
        lazy="selectin",
    )

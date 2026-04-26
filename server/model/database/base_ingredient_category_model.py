"""Base Ingredient Category Table"""

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from model.database.base import ModelBase


# pylint: disable-next=too-few-public-methods
class BaseIngredientCategoryModel(ModelBase):
    """Base Ingredient Category Table"""

    __tablename__ = "base_ingredient_category"

    id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column("title", String, nullable=False, unique=True)

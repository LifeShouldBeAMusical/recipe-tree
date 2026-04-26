"""Component Table - xref recipe with ingredient/sub-recipe"""

from typing import Optional

from sqlalchemy import DECIMAL, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base_ingredient_model import BaseIngredientModel
from model.database.base import ModelBase


# pylint: disable-next=too-few-public-methods
class ComponentModel(ModelBase):
    """Recipe Component"""

    __tablename__ = "component"
    __table_args__ = (
        UniqueConstraint(
            "recipe_id", "base_ingredient_id", name="unique_recipe_ingredient"
        ),
        UniqueConstraint("recipe_id", "sub_recipe_id", name="unique_recipe_sub_recipe"),
    )

    id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    recipe_id: Mapped[int] = mapped_column(
        "recipe_id",
        ForeignKey("recipe.id", None, False, "foreign_recipe_id"),
        nullable=False,
    )
    ingredient_id: Mapped[Optional[int]] = mapped_column(
        "base_ingredient_id",
        ForeignKey("base_ingredient.id", None, False, "foreign_ingredient_id"),
        nullable=True,
    )
    sub_recipe_id: Mapped[Optional[int]] = mapped_column(
        "sub_recipe_id",
        ForeignKey("recipe.id", None, False, "foreign_sub_recipe_id"),
        nullable=True,
    )
    quantity: Mapped[Optional[float]] = mapped_column(
        "quantity", DECIMAL, nullable=True
    )
    quantity_unit: Mapped[Optional[str]] = mapped_column(
        "quantity_unit", String, nullable=True
    )

    recipe: Mapped["RecipeModel"] = relationship(  # type: ignore
        foreign_keys=recipe_id, back_populates="components", lazy="selectin"
    )
    ingredient: Mapped[Optional[BaseIngredientModel]] = relationship(
        back_populates="components",
        primaryjoin=ingredient_id == BaseIngredientModel.id,
        lazy="selectin",
    )
    sub_recipe: Mapped[Optional["RecipeModel"]] = relationship(  # type: ignore
        foreign_keys=sub_recipe_id, back_populates="super_components", lazy="selectin"
    )

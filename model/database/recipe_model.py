"""Recipe Table"""

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.component_model import ComponentModel
from model.database.base import ModelBase


class RecipeModel(ModelBase):
    """Recipe Table"""

    __tablename__ = "recipe"

    id: Mapped[int] = mapped_column("id", Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column("title", String, nullable=False, unique=True)

    components: Mapped[list[ComponentModel]] = relationship(
        back_populates="recipe",
        primaryjoin=id == ComponentModel.recipe_id,
        lazy="selectin",
    )
    super_components: Mapped[list[ComponentModel]] = relationship(
        back_populates="sub_recipe",
        primaryjoin=id == ComponentModel.sub_recipe_id,
        lazy="selectin",
    )

"""Grocery Strawberry Models"""

from typing import Optional

from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import (
    BaseIngredientCategoryModel,
    BaseIngredientModel,
    ComponentModel,
    RecipeModel,
)
from model.strawberry.model.id_title import IdTitle


@strawberry.type(name="RecipeTree")
class RecipeTree(IdTitle):
    """Recipe Tree Node"""

    @strawberry.field
    async def recipes(self) -> Optional[list["RecipeTree"]]:
        """Lazy-Load Parent Nodes"""

        async with get_async_session() as async_session:
            results = (
                await async_session.scalars(
                    select(RecipeModel).where(
                        RecipeModel.components.any(
                            # pylint: disable-next=comparison-with-callable
                            ComponentModel.sub_recipe_id
                            == self.id
                        )
                    )
                )
            ).all()
            return [RecipeTree.marshal(r) for r in results]

    @classmethod
    def marshal(cls, model: RecipeModel) -> "RecipeTree":
        """Coerce Database Model to Strawberry Model"""

        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type(name="GroceryCategory")
# pylint: disable-next=too-few-public-methods
class GroceryCategory(IdTitle):
    """Grocery Category"""

    @classmethod
    def marshal(cls, model: BaseIngredientCategoryModel) -> "GroceryCategory":
        """Coerce Database Model to Strawberry Model"""

        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type(name="GroceryItem")
# pylint: disable-next=too-few-public-methods
class GroceryItem(IdTitle):
    """Grocery Item"""

    category: Optional[GroceryCategory] = strawberry.field
    recipes: list[RecipeTree] = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "GroceryItem":
        """Coerce Database Model to Strawberry Model"""

        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            category=(
                GroceryCategory.marshal(model.category)
                if model.category is not None
                else None
            ),
            recipes=[RecipeTree.marshal(c.recipe) for c in model.components],
        )

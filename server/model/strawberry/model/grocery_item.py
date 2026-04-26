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


@strawberry.type
class RecipeTree:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @strawberry.field
    async def recipes(self) -> Optional[list["RecipeTree"]]:
        async with get_async_session() as async_session:
            results = (
                await async_session.scalars(
                    select(RecipeModel).where(
                        RecipeModel.components.any(
                            ComponentModel.sub_recipe_id == self.id
                        )
                    )
                )
            ).all()
            return [RecipeTree.marshal(r) for r in results]

    @classmethod
    def marshal(cls, model: RecipeModel) -> "RecipeTree":
        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type
class GroceryCategory:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientCategoryModel) -> "GroceryCategory":
        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type
class GroceryItem:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field
    category: Optional[GroceryCategory] = strawberry.field
    recipes: list[RecipeTree] = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "GroceryItem":
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

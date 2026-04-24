from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel


@strawberry.type
class RecipeTree:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @strawberry.field
    async def recipes(self) -> list["RecipeTree"]:
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
class GroceryItem:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field
    recipes: list[RecipeTree] = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "GroceryItem":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            recipes=[RecipeTree.marshal(c.recipe) for c in model.components],
        )

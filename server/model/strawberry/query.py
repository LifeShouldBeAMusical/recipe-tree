from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database.base_ingredient_model import BaseIngredientModel
from model.database.recipe_model import RecipeModel
from model.strawberry.model import GroceryItem, Recipe


@strawberry.type
class Query:

    @strawberry.field
    async def recipe(self, info: strawberry.Info, recipe_id: int) -> Recipe:
        async with get_async_session() as async_session:
            result = (
                await async_session.scalars(
                    select(RecipeModel).where(RecipeModel.id == recipe_id)
                )
            ).one()
            return Recipe.marshal(result)

    @strawberry.field
    async def recipes() -> list[Recipe]:
        async with get_async_session() as async_session:
            results = (await async_session.scalars(select(RecipeModel))).all()
            return [Recipe.marshal(r) for r in results]

    @strawberry.field
    async def grocery_list() -> list[GroceryItem]:
        async with get_async_session() as async_session:
            results = (await async_session.scalars(select(BaseIngredientModel))).all()
            return [GroceryItem.marshal(r) for r in results]

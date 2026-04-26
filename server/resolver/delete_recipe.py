from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import RecipeModel


async def delete_recipe_mutation(self, info: strawberry.Info, recipe_id: int) -> bool:
    async with get_async_session() as async_session:
        recipe_model = (
            await async_session.scalars(
                select(RecipeModel).where(RecipeModel.id == recipe_id)
            )
        ).one()
        for c in recipe_model.components:
            await async_session.delete(c)
        await async_session.delete(recipe_model)
        await async_session.commit()

    async with get_async_session() as async_session:
        recipe_model = (
            await async_session.scalars(
                select(RecipeModel).where(RecipeModel.id == recipe_id)
            )
        ).one_or_none()

        return recipe_model == None

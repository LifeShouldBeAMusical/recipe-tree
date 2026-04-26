"""Delete Recipe"""

from sqlalchemy import select

from database_connection import get_async_session
from model.database import RecipeModel
from resolver.util import get_recipe_by_id


async def delete_recipe_mutation(recipe_id: int) -> bool:
    """Delete Recipe"""

    async with get_async_session() as async_session:
        recipe_model = await get_recipe_by_id(async_session, recipe_id)
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

        return recipe_model is None

"""Get Recipe"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from model.database import RecipeModel


async def get_recipe_by_id(async_session: AsyncSession, recipe_id: int) -> int:
    """Get Recipe by ID"""

    return (
        await async_session.scalars(
            select(RecipeModel).where(RecipeModel.id == recipe_id)
        )
    ).one()

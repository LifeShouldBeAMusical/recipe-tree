from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import BaseIngredientCategoryModel
from model.database import BaseIngredientModel


async def categorize_ingredient_mutation(
    self, info: strawberry.Info, ingredient_id: int, category: str
) -> bool:
    async with get_async_session() as async_session:
        ingredient_model = (
            await async_session.scalars(
                select(BaseIngredientModel).where(
                    BaseIngredientModel.id == ingredient_id
                )
            )
        ).one()
        category_model = (
            await async_session.scalars(
                select(BaseIngredientCategoryModel).where(
                    BaseIngredientCategoryModel.title.like(category)
                )
            )
        ).one_or_none() or BaseIngredientCategoryModel(title=category)
        ingredient_model.category = category_model
        await async_session.commit()

        return True

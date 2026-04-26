from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database.base_ingredient_model import BaseIngredientModel
from model.strawberry.model.grocery_item import GroceryItem


async def rename_ingredient_mutation(
    self, info: strawberry.Info, ingredient_id: int, title: str
) -> GroceryItem:
    async with get_async_session() as async_session:
        ingredient = (
            await async_session.scalars(
                select(BaseIngredientModel).where(
                    BaseIngredientModel.id == ingredient_id
                )
            )
        ).one()
        ingredient.title = title.strip()
        await async_session.commit()

        return GroceryItem.marshal(ingredient)

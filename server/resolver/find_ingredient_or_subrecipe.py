from typing import Union

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from model.database import BaseIngredientModel, RecipeModel


async def find_ingredient_or_subrecipe(
    async_session: AsyncSession, ingredient_title: str
) -> Union[RecipeModel, BaseIngredientModel]:
    if (
        sub_recipe_model := (
            await async_session.scalars(
                select(RecipeModel).where(RecipeModel.title.like(ingredient_title))
            )
        ).one_or_none()
    ) is not None:
        return sub_recipe_model

    ingredient_model = (
        await async_session.scalars(
            select(BaseIngredientModel).where(
                BaseIngredientModel.title.like(ingredient_title)
            )
        )
    ).one_or_none() or BaseIngredientModel(title=ingredient_title)
    async_session.add(ingredient_model)
    await async_session.flush()
    await async_session.refresh(ingredient_model)

    return ingredient_model

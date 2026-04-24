from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel
from model.strawberry.recipe_input import IngredientInput


async def add_ingredient_to_recipe_mutation(
    self, info: strawberry.Info, recipe_id: int, ingredient: IngredientInput
) -> int:

    async with get_async_session() as async_session:
        recipe_model = (
            await async_session.scalars(
                select(RecipeModel).where(RecipeModel.id == recipe_id)
            )
        ).one()
        ingredient_model = (
            await async_session.scalars(
                select(BaseIngredientModel).where(
                    BaseIngredientModel.title == ingredient.title
                )
            )
        ).one_or_none() or BaseIngredientModel(title=ingredient.title)
        component_model = (
            ComponentModel(
                quantity=ingredient.quantity.quantity,
                quantity_unit=ingredient.quantity.unit,
            )
            if ingredient.quantity is not None
            else ComponentModel()
        )
        component_model.ingredient = ingredient_model
        recipe_model.components.append(component_model)

        async_session.add(component_model)
        await async_session.flush()
        await async_session.refresh(recipe_model)
        await async_session.commit()

        return recipe_model.id

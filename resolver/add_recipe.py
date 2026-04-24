from sqlalchemy import select
from strawberry import Info

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel
from model.strawberry.recipe_input import RecipeInput


async def add_recipe_mutation(self, info: Info, recipe: RecipeInput) -> int:
    model = RecipeModel(title=recipe.title)

    async with get_async_session() as async_session:
        for ingredient in recipe.ingredients:
            ingredient_model = (
                await async_session.scalars(
                    select(BaseIngredientModel).where(
                        BaseIngredientModel.title == ingredient.title
                    )
                )
            ).one_or_none() or BaseIngredientModel(title=ingredient.title)
            component_model = ComponentModel(
                quantity=ingredient.quantity.quantity,
                quantity_unit=ingredient.quantity.unit,
            )
            component_model.ingredient = ingredient_model
            model.components.append(component_model)

        async_session.add(model)
        await async_session.flush()
        await async_session.refresh(model)
        await async_session.commit()

        return model.id

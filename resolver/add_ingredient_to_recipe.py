from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import ComponentModel, RecipeModel
from model.strawberry.recipe_input import IngredientInput
from resolver.find_ingredient_or_subrecipe import find_ingredient_or_subrecipe


async def add_ingredient_to_recipe_mutation(
    self, info: strawberry.Info, recipe_id: int, ingredient: IngredientInput
) -> int:

    async with get_async_session() as async_session:
        recipe_model = (
            await async_session.scalars(
                select(RecipeModel).where(RecipeModel.id == recipe_id)
            )
        ).one()

        component_model = (
            ComponentModel(
                quantity=ingredient.quantity.quantity,
                quantity_unit=ingredient.quantity.unit,
            )
            if ingredient.quantity is not None
            else ComponentModel()
        )

        sub_model = await find_ingredient_or_subrecipe(async_session, ingredient.title)
        if isinstance(sub_model, RecipeModel):
            component_model.sub_recipe = sub_model
        else:
            component_model.ingredient = sub_model

        recipe_model.components.append(component_model)

        async_session.add(component_model)
        await async_session.flush()
        await async_session.refresh(recipe_model)
        await async_session.commit()

        return recipe_model.id

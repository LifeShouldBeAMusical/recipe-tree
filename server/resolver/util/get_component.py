"""Compile Component"""

from sqlalchemy.ext.asyncio import AsyncSession


from model.database import ComponentModel, RecipeModel
from model.strawberry.model import IngredientInput
from resolver.util.find_ingredient_or_subrecipe import find_ingredient_or_subrecipe


async def get_component(
    async_session: AsyncSession, ingredient: IngredientInput
) -> ComponentModel:
    """Compile Component for Ingredient"""

    component_model = (
        ComponentModel(
            quantity=ingredient.quantity.quantity,
            quantity_unit=ingredient.quantity.unit,
        )
        if ingredient.quantity is not None
        else ComponentModel()
    )

    sub_model = await find_ingredient_or_subrecipe(
        async_session, ingredient.title.strip()
    )
    if isinstance(sub_model, RecipeModel):
        component_model.sub_recipe = sub_model
    else:
        component_model.ingredient = sub_model

    return component_model

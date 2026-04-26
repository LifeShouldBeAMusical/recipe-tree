"""Add Ingredient to Recipe"""

from database_connection import get_async_session
from model.strawberry.model import IngredientInput
from resolver.util import get_component, get_recipe_by_id


async def add_ingredient_to_recipe_mutation(
    recipe_id: int, ingredient: IngredientInput
) -> int:
    """Add Ingredient to Recipe"""

    async with get_async_session() as async_session:
        recipe_model = await get_recipe_by_id(async_session, recipe_id)
        component_model = await get_component(async_session, ingredient)

        recipe_model.components.append(component_model)

        async_session.add(component_model)
        await async_session.flush()
        await async_session.refresh(recipe_model)
        await async_session.commit()

        return recipe_model.id

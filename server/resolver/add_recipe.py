"""Add Recipe"""

from sqlalchemy import select

from database_connection import get_async_session
from model.database import BaseIngredientModel, RecipeModel
from model.strawberry.model import Recipe, RecipeInput
from resolver.util import get_component


async def add_recipe_mutation(recipe: RecipeInput) -> Recipe:
    """Add Recipe"""

    model = RecipeModel(title=recipe.title)

    async with get_async_session() as async_session:
        async_session.add(model)
        # await async_session.refresh(model)

        existing_ingredient_model = (
            await async_session.scalars(
                select(BaseIngredientModel).where(
                    BaseIngredientModel.title.like(recipe.title)
                )
            )
        ).one_or_none()
        if existing_ingredient_model is not None:
            for comp in existing_ingredient_model.components:
                comp.sub_recipe = model
            await async_session.delete(existing_ingredient_model)

        for ingredient in recipe.ingredients:
            component_model = await get_component(async_session, ingredient)
            component_model.recipe = model
            async_session.add(component_model)

        await async_session.flush()
        await async_session.refresh(model)
        await async_session.commit()

        return Recipe.marshal(model)

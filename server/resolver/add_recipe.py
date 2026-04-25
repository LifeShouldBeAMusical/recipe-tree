from sqlalchemy import select
from strawberry import Info

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel
from model.strawberry.model import Recipe, RecipeInput
from resolver.find_ingredient_or_subrecipe import find_ingredient_or_subrecipe


async def add_recipe_mutation(self, info: Info, recipe: RecipeInput) -> Recipe:
    model = RecipeModel(title=recipe.title)

    async with get_async_session() as async_session:
        async_session.add(model)
        await async_session.refresh(model)

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
            component_model = (
                ComponentModel(
                    quantity=ingredient.quantity.quantity,
                    quantity_unit=ingredient.quantity.unit,
                )
                if ingredient.quantity is not None
                else ComponentModel()
            )

            sub_model = await find_ingredient_or_subrecipe(
                async_session, ingredient.title
            )
            if isinstance(sub_model, RecipeModel):
                component_model.sub_recipe = sub_model
            else:
                component_model.ingredient = sub_model

            model.components.append(component_model)
            async_session.add(component_model)

        await async_session.flush()
        await async_session.refresh(model)
        await async_session.commit()

        return Recipe.marshal(model)

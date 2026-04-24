from sqlalchemy import select
from strawberry import Info

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel
from model.strawberry.recipe import Recipe
from model.strawberry.recipe_input import RecipeInput


async def add_recipe_mutation(self, info: Info, recipe: RecipeInput) -> Recipe:
    model = RecipeModel(title=recipe.title)

    async with get_async_session() as async_session:
        for ingredient in recipe.ingredients:
            component_model = ComponentModel(
                quantity=ingredient.quantity.quantity,
                quantity_unit=ingredient.quantity.unit,
            )

            if (
                sub_recipe_model := (
                    await async_session.scalars(
                        select(RecipeModel).where(
                            RecipeModel.title.like(ingredient.title)
                        )
                    )
                ).one_or_none()
            ) is not None:
                component_model.sub_recipe = sub_recipe_model
            else:
                ingredient_model = (
                    await async_session.scalars(
                        select(BaseIngredientModel).where(
                            BaseIngredientModel.title.like(ingredient.title)
                        )
                    )
                ).one_or_none() or BaseIngredientModel(title=ingredient.title)
                component_model.ingredient = ingredient_model
            model.components.append(component_model)
            async_session.add(component_model)

        await async_session.flush()
        await async_session.refresh(model)
        await async_session.commit()

        return Recipe.marshal(model)

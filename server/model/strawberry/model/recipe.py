"""Recipe Strawberry Models"""

from typing import Optional, Union

from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel
from model.strawberry.model.id_title import IdTitle


@strawberry.type
# pylint: disable-next=too-few-public-methods
class Quantity:
    """Ingredient Quantity"""

    quantity: int = strawberry.field
    unit: str = strawberry.field

    @classmethod
    def marshal(cls, model: ComponentModel) -> "Quantity":
        """Coerce Database Model to Strawberry Model"""
        return cls(quantity=model.quantity, unit=model.quantity_unit)


@strawberry.type(name="Ingredient")
# pylint: disable-next=too-few-public-methods
class Ingredient(IdTitle):
    """Base Ingredient"""

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "Ingredient":
        """Coerce Database Model to Strawberry Model"""
        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type
# pylint: disable-next=too-few-public-methods
class Component:
    """Recipe Component"""

    id: strawberry.ID = strawberry.field
    ingredient: Union[Ingredient, "Recipe"] = strawberry.field
    quantity: Optional[Quantity] = strawberry.field

    @classmethod
    def marshal(cls, model: ComponentModel) -> "Component":
        """Coerce Database Model to Strawberry Model"""

        i = None
        if model.ingredient is not None:
            i = Ingredient.marshal(model.ingredient)
        if model.sub_recipe is not None:
            i = Recipe.marshal(model.sub_recipe)
        assert i is not None

        return cls(
            id=strawberry.ID(model.id),
            ingredient=i,
            quantity=(
                Quantity.marshal(model)
                if model.quantity is not None and model.quantity_unit is not None
                else None
            ),
        )


@strawberry.type(name="Recipe")
class Recipe(IdTitle):
    """Recipe"""

    @strawberry.field
    async def components(self) -> Optional[list[Component]]:
        """Lazy-Fetch Components"""

        async with get_async_session() as async_session:
            results = (
                await async_session.scalars(
                    # pylint: disable-next=comparison-with-callable
                    select(ComponentModel).where(ComponentModel.recipe_id == self.id)
                )
            ).all()
            return [Component.marshal(c) for c in results]

    @strawberry.field
    async def uses(self) -> Optional[list["Recipe"]]:
        """Lazy-Fetch Super-Components"""

        async with get_async_session() as async_session:
            results = (
                await async_session.scalars(
                    # pylint: disable-next=comparison-with-callable
                    select(RecipeModel).where(RecipeModel.components.any(ComponentModel.sub_recipe_id == self.id))
                )
            ).all()
            return [Recipe.marshal(c) for c in results]

    @classmethod
    def marshal(cls, model: RecipeModel) -> "Recipe":
        """Coerce Database Model to Strawberry Model"""
        return cls(id=strawberry.ID(model.id), title=model.title)

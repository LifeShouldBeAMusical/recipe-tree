from typing import Optional, Union

from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database import BaseIngredientModel, ComponentModel, RecipeModel


@strawberry.type
class Quantity:
    quantity: int = strawberry.field
    unit: str = strawberry.field

    @classmethod
    def marshal(cls, model: ComponentModel) -> "Quantity":
        return cls(quantity=model.quantity, unit=model.quantity_unit)


@strawberry.type
class Ingredient:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "Ingredient":
        return cls(id=strawberry.ID(model.id), title=model.title)


@strawberry.type
class Component:
    id: strawberry.ID = strawberry.field
    ingredient: Union[Ingredient, "Recipe"] = strawberry.field
    quantity: Optional[Quantity] = strawberry.field

    @classmethod
    def marshal(cls, model: ComponentModel) -> "Component":
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


@strawberry.type
class Recipe:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @strawberry.field
    async def components(self) -> list[Component]:
        async with get_async_session() as async_session:
            results = (
                await async_session.scalars(
                    select(ComponentModel).where(ComponentModel.recipe_id == self.id)
                )
            ).all()
            return [Component.marshal(c) for c in results]

    @classmethod
    def marshal(cls, model: RecipeModel) -> "Recipe":
        return cls(id=strawberry.ID(model.id), title=model.title)

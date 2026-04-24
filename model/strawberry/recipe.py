from typing import Optional, Union

from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database.base_ingredient_model import BaseIngredientModel
from model.database.component_model import ComponentModel
from model.database.recipe_model import RecipeModel


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
            i = Ingredient.marshal(i)
        if model.sub_recipe is not None:
            i = Recipe.marshal(i)
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
    ingredients: list[Component] = strawberry.field

    @classmethod
    def marshal(cls, model: RecipeModel) -> "Recipe":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            ingredients=[Component.marshal(i) for i in model.components],
        )

from typing import Optional

import strawberry


@strawberry.input
class QuantityInput:
    quantity: int
    unit: str


@strawberry.input
class IngredientInput:
    title: str
    quantity: Optional[QuantityInput] = None


@strawberry.input
class RecipeInput:
    title: str
    ingredients: list[IngredientInput]

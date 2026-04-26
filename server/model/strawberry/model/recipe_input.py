"""Recipe Input Models"""

from typing import Optional

import strawberry


@strawberry.input
# pylint: disable-next=too-few-public-methods
class QuantityInput:
    """Quantity Input"""

    quantity: int
    unit: str


@strawberry.input
# pylint: disable-next=too-few-public-methods
class IngredientInput:
    """Ingredient Input"""

    title: str
    quantity: Optional[QuantityInput] = None


@strawberry.input
# pylint: disable-next=too-few-public-methods
class RecipeInput:
    """Recipe Input"""

    title: str
    ingredients: list[IngredientInput]

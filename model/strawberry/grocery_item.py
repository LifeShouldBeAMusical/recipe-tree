import strawberry

from model.database import BaseIngredientModel, RecipeModel


def all_the_way_up(model: RecipeModel) -> str:
    if len(model.super_components) == 0:
        return model.title
    paren = " ,".join(
        all_the_way_up(super_c.recipe) for super_c in model.super_components
    )
    return f"{model.title} ({paren})"


@strawberry.type
class RecipeTree:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field
    recipes: list["RecipeTree"] = strawberry.field

    @classmethod
    def marshal(cls, model: RecipeModel) -> "RecipeTree":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            recipes=[
                RecipeTree.marshal(super_c.recipe) for super_c in model.super_components
            ],
        )


@strawberry.type
class GroceryItem:
    id: strawberry.ID = strawberry.field
    title: str = strawberry.field
    recipes: list[RecipeTree] = strawberry.field

    @classmethod
    def marshal(cls, model: BaseIngredientModel) -> "GroceryItem":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            recipes=[RecipeTree.marshal(c.recipe) for c in model.components],
        )

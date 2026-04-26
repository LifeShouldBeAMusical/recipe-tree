"""Strawberry Mutation Model"""

import strawberry

from resolver import (
    add_ingredient_to_recipe_mutation,
    add_recipe_mutation,
    categorize_ingredient_mutation,
    delete_recipe_mutation,
    rename_ingredient_mutation,
)


@strawberry.type
# pylint: disable-next=too-few-public-methods
class Mutation:
    """Strawberry Mutation"""

    add_recipe = strawberry.mutation(resolver=add_recipe_mutation)
    add_ingredient_to_recipe = strawberry.mutation(
        resolver=add_ingredient_to_recipe_mutation
    )
    categorize_ingredient = strawberry.mutation(resolver=categorize_ingredient_mutation)
    delete_recipe = strawberry.mutation(resolver=delete_recipe_mutation)
    rename_ingredient = strawberry.mutation(resolver=rename_ingredient_mutation)

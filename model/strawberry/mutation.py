import strawberry

from resolver import (
    add_ingredient_to_recipe_mutation,
    add_recipe_mutation,
    rename_ingredient_mutation,
)


@strawberry.type
class Mutation:

    add_recipe = strawberry.mutation(resolver=add_recipe_mutation)
    add_ingredient_to_recipe = strawberry.mutation(
        resolver=add_ingredient_to_recipe_mutation
    )
    rename_ingredient = strawberry.mutation(resolver=rename_ingredient_mutation)

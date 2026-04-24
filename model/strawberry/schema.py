from sqlalchemy import select
from strawberry import Info, Schema
import strawberry

from database_connection import get_async_session
from model.database.recipe_model import RecipeModel


@strawberry.type
class Recipe:

    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

    @classmethod
    def marshal(cls, model: RecipeModel) -> "Recipe":
        return cls(id=strawberry.ID(model.id), title=model.title)

@strawberry.type
class Query:

    @strawberry.field
    def hello_world() -> str:
        return "Hello World"
    
    @strawberry.field
    async def recipes() -> list[Recipe]:
        async with get_async_session() as async_session:
            results = (await async_session.scalars(select(RecipeModel))).all()
            return [Recipe.marshal(r) for r in results]



@strawberry.input
class RecipeInput:
    title: str


@strawberry.type
class Mutation:

    @strawberry.mutation
    async def add_recipe(self, info: Info, recipe: RecipeInput) -> int:
        model = RecipeModel(title=recipe.title)
        async with get_async_session() as async_session:
            async_session.add(model)
            await async_session.flush()
            await async_session.refresh(model)
            await async_session.commit()

            return model.id


schema = Schema(query=Query, mutation=Mutation)

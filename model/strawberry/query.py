from sqlalchemy import select
import strawberry

from database_connection import get_async_session
from model.database.recipe_model import RecipeModel
from model.strawberry.recipe import Recipe


@strawberry.type
class Query:

    @strawberry.field
    async def recipes() -> list[Recipe]:
        async with get_async_session() as async_session:
            results = (await async_session.scalars(select(RecipeModel))).all()
            return [Recipe.marshal(r) for r in results]

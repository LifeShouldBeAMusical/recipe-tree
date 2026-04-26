"""ID & Title"""

import strawberry


@strawberry.type
# pylint: disable-next=too-few-public-methods
class IdTitle:
    """ID & Title"""

    id: strawberry.ID = strawberry.field
    title: str = strawberry.field

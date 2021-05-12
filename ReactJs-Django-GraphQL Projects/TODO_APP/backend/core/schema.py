import graphene
from todo import schema


class Query(schema.Query,graphene.ObjectType):
    # name=graphene.String(default_value="Fahim Rahman")
    pass
class Mutation(schema.Mutation,graphene.ObjectType):
    pass

schema=graphene.Schema(query=Query,mutation=Mutation)
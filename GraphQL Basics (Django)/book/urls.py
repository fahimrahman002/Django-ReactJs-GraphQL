from django.urls import path
from graphene_django.views import GraphQLView
from book.schema import schema
from book import views
urlpatterns = [
    path("graphql", GraphQLView.as_view(graphiql=True, schema=schema))
    # path("test", views.test, name='test')
]

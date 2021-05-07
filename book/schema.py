import graphene
from graphene_django import DjangoObjectType
from book.models import Books, Author


class BooksType(DjangoObjectType):
    class Meta:
        model = Books
        fields = ("id", "title", "excerpt")


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = ("id", "name", "age", "email", "phone")


class Query(graphene.ObjectType):
    all_books = graphene.List(BooksType)
    all_authors = graphene.List(AuthorType)
    category_by_name = graphene.Field(
        AuthorType, name=graphene.String(required=True))

    def resolve_all_books(root, info):
        return Books.objects.all()

    def resolve_all_authors(root, info):
        return Author.objects.all()

    def resolve_category_by_name(root, info, name):
        try:
            return Author.objects.get(name=name)
        except Author.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)

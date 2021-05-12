import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import Quiz,Category,Question,Answer

class CategoryType(DjangoObjectType):
    class Meta:
        model=Category
        fields=("id","name")

class QuizType(DjangoObjectType):
    class Meta:
        model=Quiz
        fields=("id","title","category","quiz")
class QuestionType(DjangoObjectType):
    class Meta:
        model=Question
        fields=("title","quiz")
class AnswerType(DjangoObjectType):
    class Meta:
        model=Answer
        fields=("question","answer_text")

class Query(graphene.ObjectType):
    # all_quiz=DjangoListField(QuizType)
    all_quiz=graphene.Field(QuizType,id=graphene.Int())
    all_questions=graphene.List(QuestionType)
    def resolve_all_quiz(root,info,id):
        return Quiz.objects.get(pk=id)

    def resolve_all_questions(root,info):
        return Question.objects.all()

##----------Create Operation--------------##
# class CategoryMutation(graphene.Mutation):
#     class Arguments:
#         name=graphene.String(required=True)
#     category=graphene.Field(CategoryType)
#     @classmethod
#     def mutate(cls,root,info,name):
#         category=Category(name=name)
#         category.save()
#         return CategoryMutation(category=category)

##----------Update Operation--------------##
# class CategoryMutation(graphene.Mutation):
#     class Arguments:
#         id=graphene.ID()
#         name=graphene.String(required=True)
#     category=graphene.Field(CategoryType)
#     @classmethod
#     def mutate(cls,root,info,name,id):
#         category=Category.objects.get(id=id)
#         category.name=name
#         category.save()
#         return CategoryMutation(category=category)

##----------Delete Operation--------------##       
class CategoryMutation(graphene.Mutation):
    class Arguments:
        id=graphene.ID()
    category=graphene.Field(CategoryType)
    @classmethod
    def mutate(cls,root,info,id):
        category=Category.objects.get(id=id)
        category.delete()
        return
  


class Mutation(graphene.ObjectType):
    # update_category=CategoryMutation.Field()
    delete_category=CategoryMutation.Field()

schema=graphene.Schema(query=Query,mutation=Mutation)
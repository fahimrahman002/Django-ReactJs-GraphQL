from django.contrib import admin
from . import models

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display=['name',]

@admin.register(models.Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display=['id','title']


class AnswerInlineModel(admin.TabularInline):
    model=models.Answer
    fields=['answer_text','is_right']
    

@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    fields=['title','quiz','technique','difficulty','is_active']
    list_display=['quiz','title','technique']
    inlines=[AnswerInlineModel]

@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = [
        'answer_text', 
        'is_right', 
        'question'
        ]


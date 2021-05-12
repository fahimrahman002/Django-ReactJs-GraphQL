from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    title = models.CharField(max_length=255, default=_("New Quiz"))
    Category = models.ForeignKey(
        Category, default=1, on_delete=models.DO_NOTHING)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    scale = (
        (0, _('Fundamental')),
        (1, _('Beginner')),
        (2, _('Intermediate')),
        (3, _('Advanced')),
        (4, _('Expert')),
    )
    type = (
        (0, _('Multiple Choice')),
        (1, _('Written')),
    )
    quiz = models.ForeignKey(
        Quiz, related_name='question', on_delete=models.DO_NOTHING)
    technique = models.IntegerField(
        choices=type, default=0, verbose_name=_('Type of Question'))
    title = models.CharField(max_length=255, verbose_name=_('Title'))
    difficulty = models.IntegerField(
        choices=scale, default=0, verbose_name=_('difficulty'))
    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name=_('Date created'))
    is_active = models.BooleanField(
        default=False, verbose_name=_('Active status'))

    def __str__(self):
        return self.title


class Answer(models.Model):
    question = models.ForeignKey(
        Question, related_name='answer', on_delete=models.DO_NOTHING
    )
    answer_text = models.CharField(max_length=255, verbose_name=_('Answer Text')
                                   )
    is_right = models.BooleanField(default=False)

    def __str__(self):
        return self.answer_text

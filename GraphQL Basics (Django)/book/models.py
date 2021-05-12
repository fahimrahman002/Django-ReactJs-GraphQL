from django.db import models


class Books(models.Model):
    title = models.CharField(max_length=100)
    excerpt = models.TextField()

    def __str__(self):
        return self.title


class Author(models.Model):
    name = models.CharField(max_length=20)
    age = models.IntegerField()
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name

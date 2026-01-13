from django.db import models
class Student(models.Model):
    name=models.CharField(max_length=100)
    age=models.IntegerField()
    city=models.CharField(max_length=100)
# Create your models here.
def __str__(self):
    return self.name
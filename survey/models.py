from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime, timedelta


class User(AbstractUser):
    pass


class Survey(models.Model):
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_surveys")
    description = models.TextField()
    name = models.CharField(max_length=64)
    is_active = models.BooleanField(default=True)
    timecreated = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(default=datetime.now() + timedelta(days=14))


class Question(models.Model):

    QUESTION_TYPES = (
    (1, 'Text answer'),
    (2, 'Checkbox'),
    (3, 'Radio'),
    (4, 'Integer'),
    (5, 'Score'),
    )

    survey = models.ForeignKey("Survey", on_delete=models.CASCADE, related_name="questions")
    type = models.CharField(choices=QUESTION_TYPES, default='Text answer', max_length=64)
    text = models.TextField()


class QuestionOption(models.Model):
    question = models.ForeignKey("Question", on_delete=models.CASCADE, related_name="options")
    option = models.TextField()


class Submition(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_submitions")
    survey = models.ForeignKey("Survey", on_delete=models.CASCADE, related_name="submitions")
    timecreated = models.DateTimeField(auto_now_add=True)


class Answer(models.Model):
    submition = models.ForeignKey("Submition", on_delete=models.CASCADE, related_name="submition_answers")
    question = models.ForeignKey("Question", on_delete=models.CASCADE, related_name="answers")   


class OptionAnswer(models.Model):
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE, related_name="options_answers")
    option = models.ForeignKey("QuestionOption", on_delete=models.CASCADE, related_name="the_options_in_answer")


class TextAnswer(models.Model):
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE, related_name="text_answers")
    text = models.TextField()


class IntegerAnswer(models.Model):
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE, related_name="integer_answers")
    integer = models.IntegerField()
    


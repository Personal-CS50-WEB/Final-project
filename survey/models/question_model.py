from django.db import models
from .survey_model import Survey

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


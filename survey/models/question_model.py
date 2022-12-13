from django.db import models
from .survey_model import Survey


QUESTION_TYPES = [
    ('TEXT-ANSWER', 'Text answer'),
    ('CHECKBOX', 'Checkbox'),
    ('RADIO', 'Radio'),
    ('INTEGER', 'Integer'),
    ('SCORE', 'Score'),
    ]


class Question(models.Model):
    survey = models.ForeignKey("Survey", on_delete=models.CASCADE, related_name="questions")
    type = models.CharField(choices=QUESTION_TYPES, default='Text answer', max_length=64)
    text = models.TextField()


class QuestionOption(models.Model):
    question = models.ForeignKey("Question", on_delete=models.CASCADE, related_name="options")
    option = models.TextField()


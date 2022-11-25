from django.db import models
from .submission_model import Submission
from .question_model import Question, QuestionOption


class Answer(models.Model):
    submission  = models.ForeignKey("Submission", on_delete=models.CASCADE, related_name="submission_answers")
    question = models.ForeignKey("Question", on_delete=models.CASCADE, related_name="answers")   


class OptionAnswer(models.Model):
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE, related_name="options_answers")
    option = models.ForeignKey("QuestionOption", on_delete=models.CASCADE, related_name="the_options_in_answer")


class TextAnswer(models.Model):
    answer = models.OneToOneField("Answer", on_delete=models.CASCADE, related_name="text_answers")
    text = models.TextField()


class IntegerAnswer(models.Model):
    answer = models.OneToOneField("Answer", on_delete=models.CASCADE, related_name="integer_answers")
    integer = models.IntegerField()
    
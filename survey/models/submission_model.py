from django.db import models
from .survey_model import Survey
from .user_model import User


class Submission(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_submissions")
    survey = models.ForeignKey("Survey", on_delete=models.CASCADE, related_name="submissions")
    timecreated = models.DateTimeField(auto_now_add=True)

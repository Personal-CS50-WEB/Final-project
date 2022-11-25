from django.db import models
from datetime import datetime, timedelta
from .user_model import User


class Survey(models.Model):
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_surveys")
    description = models.TextField()
    name = models.CharField(max_length=64)
    timecreated = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(default=datetime.now() + timedelta(days=14))



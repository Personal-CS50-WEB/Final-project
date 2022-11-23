from django.shortcuts import render
from rest_framework import viewsets, mixins
from survey.serializers import surveyserializer, submissionserializer
from .models import *
from rest_framework.response import Response
from datetime import datetime, timezone


# Create your views here.
class SurveyView(viewsets.ModelViewSet):
    """
    ViewSet for creating/viewing surveys.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.exclude(deadline__lte=datetime.now(tz=timezone.utc)).order_by('-timecreated')
    http_method_names = ['get', 'post', 'head', 'patch']


class SubmissionView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for creating/viewing sumbissions.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all().order_by('-timecreated')


class UserSubmissionView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all sumbissions for users.
    """
    serializer_class = submissionserializer.UserSubmissionSerializer
    queryset = User.objects.all()


class UserSurveyView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all surveys for users.
    """
    serializer_class = surveyserializer.UserSurveySerializer
    queryset = User.objects.all()


class SurveySubmissionView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all sumbissions for surveys.
    """
    serializer_class = submissionserializer.SurveySubmissionSerializer
    queryset = Survey.objects.all().order_by('-timecreated')


class ExpiredSurveyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing expired surveys.
    """
    queryset = Survey.objects.filter(deadline__lte=datetime.now(tz=timezone.utc))
    serializer_class = surveyserializer.SurveySerializer

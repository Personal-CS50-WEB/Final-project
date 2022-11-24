from django.shortcuts import render
from rest_framework import viewsets, mixins
from survey.serializers import surveyserializer, submissionserializer
from .models import *
from rest_framework.response import Response
from datetime import datetime, timezone
from survey.permissions import IsOwnerOrReadOnly


# Create your views here.
class SurveyView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for creating/viewing surveys.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.exclude(
        deadline__lte=datetime.now(tz=timezone.utc)).order_by('-timecreated'
    )

    def list(self, request, *args, **kwargs):
        # when listing surveys return name, id, deadline and description
        serializer = self.get_serializer(
            self.queryset,
            many=True, 
            fields=['id', 'name', 'description', 'deadline']
        )
        return Response(serializer.data)


class SubmissionView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for creating/viewing sumbissions.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all().order_by('-timecreated')

    def list(self, request, *args, **kwargs):
        query = self.queryset
        survey = self.request.GET.get('survey')
        # survey = kwargs['survey']
        queryset = query.filter(survey=1) # survey
        serializer = self.get_serializer(queryset, many=True, fields=['id', 'timecreated', 'user'])
        return Response(serializer.data)


class UserSubmissionView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all sumbissions for users.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all()

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(user=1) # self.request.user
        serializer = self.get_serializer(queryset, many=True, fields=['id', 'timecreated', 'survey_data'])
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        query = self.queryset
        submission = query.get(survey=1, user=1) # self.request.user ,kwargs['pk']
        serializer = self.get_serializer(submission, fields=['id', 'submission_answers'])
        return Response(serializer.data)


class UserSurveyView(mixins.ListModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for viewing all surveys for users.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.all()
    http_method_names = ['get', 'head', 'patch']
    permission_classes = [IsOwnerOrReadOnly]

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(owner=1) # self.request.user
        serializer = self.get_serializer(queryset, many=True, fields=['id', 'name', 'deadline'])
        return Response(serializer.data)


class ExpiredSurveyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing expired surveys.
    """
    queryset = Survey.objects.filter(deadline__lte=datetime.now(tz=timezone.utc))
    serializer_class = surveyserializer.SurveySerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True, fields=['id', 'name', 'description', 'deadline'])
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        # todo
        return super().retrieve(request, *args, **kwargs)
    
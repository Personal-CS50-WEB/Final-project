from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions
from survey.models.submission_model import Submission
from survey.models.survey_model import Survey
from survey.serializers import surveyserializer, submissionserializer, surveyresultserializer

from rest_framework.response import Response
from datetime import datetime, timezone
from survey.permissions import IsOwner
from django.core.exceptions import PermissionDenied
from django.db.models import Count

# Create your views here.
class SurveyView(viewsets.ReadOnlyModelViewSet):
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
                    viewsets.GenericViewSet):
    """
    ViewSet for creating/viewing sumbissions.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all().order_by('-timecreated')
    # permission_classes = [permissions.IsAuthenticated]

    #def get_permissions(self):
        #if self.action != "create":
            #survey= self.request.GET.get('survey')
            #survey_data = Survey.objects.get(pk=1) #survey
            #print(survey_data.owner)
            #if survey_data.owner != self.request.user:
            #    raise PermissionDenied()
        #return super().get_permissions()

    def list(self, request, *args, **kwargs):
        query = self.queryset
        survey = self.request.GET.get('survey')
        queryset = query.filter(survey=1) # survey
        serializer = self.get_serializer(
            queryset, 
            many=True, 
            fields=['id', 'timecreated', 'user_data']
            )
        return Response(serializer.data)


class UserSubmissionView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all sumbissions for users.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(user=1) # self.request.user
        serializer = self.get_serializer(
            queryset, 
            many=True, 
            fields=['id', 'timecreated', 'survey_data']
        )
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, fields= ['submission_answers'])
        return Response(serializer.data)
    

class UserSurveyView(mixins.ListModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for viewing all surveys for users.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.all()
    http_method_names = ['get', 'post', 'head', 'patch']
    # permission_classes = [permissions.IsAuthenticated]

    #def get_permissions(self):
       # if self.action == "partial_update":
          #  self.permission_classes = [IsOwner]
        #return super().get_permissions()

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(owner=1) # self.request.user
        serializer = self.get_serializer(
            queryset, 
            many=True, 
            fields=['id', 'name', 'deadline']
        )
        return Response(serializer.data)


class ExpiredSurveyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing expired surveys.
    """
    queryset = Survey.objects.filter(
        deadline__lte=datetime.now(tz=timezone.utc)
        ).annotate(
            total_submissions=Count('submissions')
        )
    serializer_class = surveyresultserializer.SurveyResultSerializer

    def list(self, request, *args, **kwargs):
    
        serializer = self.get_serializer(
        self.queryset, 
            many=True, 
            fields=['id', 'name', 'description', 'deadline', 'total_submissions']
        )
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        # todo
        return super().retrieve(request, *args, **kwargs)
    
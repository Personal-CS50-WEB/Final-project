from rest_framework import viewsets
from survey.models.survey_model import Survey
from survey.serializers import  surveyresultserializer
from rest_framework.response import Response
from datetime import datetime, timezone
from django.db.models import Count


class ExpiredSurveyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing expired surveys.
    """
    queryset = Survey.objects.all().filter(
        deadline__lte=datetime.now(tz=timezone.utc)
        ).annotate(
            total_submissions=Count('submissions')
        )
    serializer_class = surveyresultserializer.SurveyResultSerializer

    def list(self, request, *args, **kwargs):
        queryset =  self.queryset.all()
        serializer = self.get_serializer(
        queryset, 
            many=True, 
            fields=['id', 'name', 'description', 'deadline', 'total_submissions']
        )
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        # todo
        return super().retrieve(request, *args, **kwargs)
        
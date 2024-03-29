from survey.models.survey_model import Survey
from survey.serializers import surveyserializer
from rest_framework.response import Response
from datetime import datetime, timezone
from rest_framework import viewsets


# Create your views here.
class SurveyView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for creating/viewing surveys.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.all()
    
    def list(self, request, *args, **kwargs):
        # when listing surveys return name, id, deadline and description
        queryset = self.queryset.all().exclude(
        deadline__lte=datetime.now(tz=timezone.utc)).order_by('-timecreated'
    )
        serializer = self.get_serializer(
            queryset,
            many=True, 
            fields=['id', 'name', 'description', 'deadline']
        )
        return Response(serializer.data)
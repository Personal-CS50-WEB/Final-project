from rest_framework import viewsets, mixins, permissions
from survey.models.survey_model import Survey
from survey.serializers import surveyserializer
from rest_framework.response import Response
from survey.permissions import IsOwner
from datetime import datetime, timezone


class UserSurveyView(mixins.ListModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for viewing all surveys for users.
    """
    serializer_class = surveyserializer.SurveySerializer
    queryset =  queryset = Survey.objects.exclude(
        deadline__lte=datetime.now(tz=timezone.utc)).order_by('-timecreated'
    )
    http_method_names = ['get', 'post', 'head', 'patch']
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == "partial_update":
            self.permission_classes = [IsOwner]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(owner=self.request.user) # self.request.user
        serializer = self.get_serializer(
            queryset, 
            many=True, 
            fields=['id', 'name', 'deadline']
        )
        return Response(serializer.data)

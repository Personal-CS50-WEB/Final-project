from rest_framework import viewsets, mixins, permissions
from survey.models.submission_model import Submission
from survey.models.survey_model import Survey
from survey.serializers import  submissionserializer
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied


class SubmissionView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    """
    ViewSet for creating/viewing sumbissions.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all().order_by('-timecreated')
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action != "create":
            survey = self.request.GET.get('survey')
            survey_data = Survey.objects.get(pk=survey) 
            print(survey_data.owner)
            if survey_data.owner != self.request.user:
                raise PermissionDenied()
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        query = self.queryset
        survey = self.request.GET.get('survey')
        queryset = query.filter(survey=survey) 
        serializer = self.get_serializer(
            queryset, 
            many=True, 
            fields=['id', 'timecreated', 'user_data']
            )
        return Response(serializer.data)

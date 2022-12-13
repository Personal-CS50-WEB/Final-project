from django.shortcuts import render
from rest_framework import viewsets, permissions
from survey.models.submission_model import Submission
from survey.serializers import submissionserializer
from rest_framework.response import Response


class UserSubmissionView(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all sumbissions for users.
    """
    serializer_class = submissionserializer.SubmissionSerializer
    queryset = Submission.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        query = self.queryset
        queryset = query.filter(user=self.request.user) # self.request.user
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
    
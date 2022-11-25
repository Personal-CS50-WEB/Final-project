from survey.models.survey_model import Survey
from ..models import *
from . import questionserializer, dynamicserializer, submissionserializer
from rest_framework import serializers


class SurveyResultSerializer(dynamicserializer.DynamicFieldsModelSerializer):
    questions = questionserializer.QuestionSerializer(
        many=True, 
        fields =[ 'type', 'text', 'options', 'answers']
        )
    submissions = submissionserializer.SubmissionSerializer(
        many=True,
        read_only=True, fields=['id']
        )
    total_submissions = serializers.IntegerField(read_only=True)
    class Meta:
        model = Survey
        fields = ['name', 'description','deadline', 'questions','total_submissions', 'submissions' ]

    
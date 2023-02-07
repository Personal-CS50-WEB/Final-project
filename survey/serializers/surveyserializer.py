from survey.models.question_model import Question, QuestionOption
from survey.models.survey_model import Survey
from . import questionserializer, dynamicserializer
from django.core.exceptions import ObjectDoesNotExist, SuspiciousOperation
from rest_framework import serializers
import datetime
from datetime import timezone


class SurveySerializer(dynamicserializer.DynamicFieldsModelSerializer):
    questions = questionserializer.QuestionSerializer(
        many=True, 
        fields = ['id', 'type', 'text', 'options']
        )
    total_submissions = serializers.IntegerField(read_only=True)
    class Meta:
        model = Survey
        fields = ['id', 'name', 'description','owner','timecreated', 'deadline', 'questions', 'total_submissions']
        read_only_fields = ('owner',)
        
    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        #ensure the deadline after the day survey created
        if validated_data.get('deadline') <= datetime.datetime.now(tz=timezone.utc):
            raise SuspiciousOperation()

        if questions_data:
            owner = self.context['request'].user
            survey = Survey.objects.create(owner=owner, **validated_data)
            for question_data in questions_data:
                options_data = question_data.pop('options', None)
                question = Question.objects.create(survey=survey, **question_data) 
                
                if options_data:
                    for option_data in options_data:
                        QuestionOption.objects.create(question=question, **option_data)

            return survey

        raise ObjectDoesNotExist()

    # user can update just deadline
    def update(self, instance, validated_data):
        instance.deadline = validated_data.get('deadline', instance.deadline)
        if validated_data.get('deadline') < datetime.datetime.now(tz=timezone.utc):
            raise SuspiciousOperation()
        # do nothing to instance other fields
        instance.save()
        return instance

from survey.models import Survey, Question, QuestionOption
from . import questionserializer, dynamicserializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

class SurveySerializer(dynamicserializer.DynamicFieldsModelSerializer):
    questions = questionserializer.QuestionSerializer(many=True)
    
    class Meta:
        model = Survey
        fields = ['id', 'name', 'description','owner','timecreated', 'deadline', 'questions']
        
    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        if questions_data:
            survey = Survey.objects.create(**validated_data)
            for question_data in questions_data:
                options_data = question_data.pop('options', None)
                question = Question.objects.create(survey=survey, **question_data) 
                
                if options_data:
                    for option_data in options_data:
                        QuestionOption.objects.create(question=question, **option_data)
        
            return survey

        raise ObjectDoesNotExist

        
    # user can update just deadline
    def update(self, instance, validated_data):
        instance.deadline = validated_data.get('deadline', instance.deadline)
        # do nothing to instance other fileds
        instance.save()
        return instance


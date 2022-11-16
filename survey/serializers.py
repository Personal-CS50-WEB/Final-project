from rest_framework import serializers
from .models import *


class TextAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAnswer
        fields = '__all__'


class OptionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionAnswer
        fields = '__all__'


class IntegerAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntegerAnswer
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    options_answers = OptionAnswerSerializer(required=False, many=True)
    text_answers = TextAnswerSerializer(required=False)
    integer_answers = IntegerAnswerSerializer()
    class Meta:
        model = Answer
        fields = '__all__'


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = '__all__'
        read_only_fields = ('question',)

class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(required=False, many=True)
    answers = AnswerSerializer(required=False, many=True)
    
    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ('survey',)
        


class SubmitionSerializer(serializers.ModelSerializer):
    submition_answers = AnswerSerializer(many=True, required=True)
    class Meta:
        model = Submition
        fields = '__all__'


class SurveySerializer(serializers.ModelSerializer):
    submitions = SubmitionSerializer(many=True, required=False)
    questions = QuestionSerializer(many=True)
    
    class Meta:
        model = Survey
        fields = '__all__'
    
    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        survey = Survey.objects.create(**validated_data)
    
        for question_data in questions_data:
            options_data = question_data.pop('options', None)
            question = Question.objects.create(survey=survey, **question_data) 
            
            if options_data:
                for option_data in options_data:
                    QuestionOption.objects.create(question=question, **option_data)
    
        return survey 


class UserSerializer(serializers.ModelSerializer):
    user_submitions = SubmitionSerializer(many=True, required=False)
    user_surveys = SurveySerializer(many=True, required=False)
    class Meta:
        model = User
        fields = '__all__'


from rest_framework import serializers
from survey.models.question_model import Question, QuestionOption
from . import answerserializer, dynamicserializer


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'option']


class QuestionSerializer(dynamicserializer.DynamicFieldsModelSerializer):
    options = QuestionOptionSerializer(required=False, many=True)
    answers = answerserializer.AnswerSerializer(required=False, many=True)

    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ('survey', 'answers')

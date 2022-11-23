from rest_framework import serializers
from survey.models import Question, QuestionOption


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = '__all__'
        read_only_fields = ('question',)


class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(required=False, many=True)

    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ('survey',)

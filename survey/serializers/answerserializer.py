from rest_framework import serializers
from survey.models import Answer, TextAnswer, IntegerAnswer, OptionAnswer


class TextAnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TextAnswer
        fields = ('text',)
        read_only_fields = ('answer',)


class OptionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionAnswer
        fields = '__all__'
        read_only_fields = ('answer',)


class IntegerAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntegerAnswer
        fields = '__all__'
        read_only_fields = ('answer',)


class AnswerSerializer(serializers.ModelSerializer):
    
    options_answers = OptionAnswerSerializer(required=False, many=True)
    text_answers = TextAnswerSerializer(required=False)
    integer_answers = IntegerAnswerSerializer(required=False)
    class Meta:
        model = Answer
        fields = '__all__'
        read_only_fields = ('submission',)
        
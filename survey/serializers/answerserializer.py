from rest_framework import serializers
from survey.models.answer_model import Answer, IntegerAnswer, OptionAnswer, TextAnswer


class TextAnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TextAnswer
        fields = ('text',)


class OptionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionAnswer
        fields = ('option',)
    

class IntegerAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntegerAnswer
        fields = ('integer')


class AnswerSerializer(serializers.ModelSerializer):
    
    options_answers = OptionAnswerSerializer(required=False, many=True)
    text_answers = TextAnswerSerializer(required=False)
    integer_answers = IntegerAnswerSerializer(required=False)
    class Meta:
        model = Answer
        fields = ['integer_answers', 'text_answers', 'options_answers']
        
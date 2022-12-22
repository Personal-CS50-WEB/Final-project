from rest_framework import serializers
from survey.models.answer_model import Answer, IntegerAnswer, OptionAnswer, TextAnswer
from survey.models.question_model import Question


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
        fields = ('integer',)


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields =('type', 'text')


class AnswerSerializer(serializers.ModelSerializer):
    question_data = QuestionSerializer(
        source='question', 
        read_only=True
    )
    options_answers = OptionAnswerSerializer(required=False, many=True)
    text_answer = TextAnswerSerializer(required=False)
    integer_answer = IntegerAnswerSerializer(required=False)
    class Meta:
        model = Answer
        fields = ['integer_answer', 'text_answer', 'options_answers','question', 'question_data']
        
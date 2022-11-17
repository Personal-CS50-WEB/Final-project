from rest_framework import serializers
from .models import *


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
        read_only_fields = ('submition',)

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
    
    def create(self, validated_data):
        answers_data = validated_data.pop('submition_answers')
        # create submtion record
        submition = Submition.objects.create(**validated_data)
        for answer_data in answers_data:
            question = answer_data.pop('question')

            # if question type is text
            if int(question.type) == 1:
                text_answers = answer_data.pop('text_answers', None)
                if text_answers:
                    # create record in Answer model for each question
                    answer = Answer.objects.create(submition=submition, question=question)
                    # create record in Text answer model
                    TextAnswer.objects.create(answer=answer, **text_answers)
            
            # if question type is integer or score
            elif int(question.type) == 4 or int(question.type) == 5:
                
                integer_answers = answer_data.pop('integer_answers', None)
                if integer_answers:
                    # create record in Answer model for each question
                    answer = Answer.objects.create(submition=submition, question=question)
                    # create record in integer answer model
                    IntegerAnswer.objects.create(answer=answer, **integer_answers)

            # if question type is radio or checkbox
            else:
                options_answer = answer_data.pop('options_answers', None)
                if options_answer:
                    for option_data in options_answer:
                        # create Answer record for each choise
                        answer = Answer.objects.create(submition=submition, question=question)
                        OptionAnswer.objects.create(answer=answer, **option_data)

        return submition 


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


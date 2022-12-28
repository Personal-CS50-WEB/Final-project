import datetime
from survey.models.answer_model import Answer, IntegerAnswer, OptionAnswer, TextAnswer
from survey.models.submission_model import Submission
from . import userserializer, surveyserializer, answerserializer, dynamicserializer
from django.core.exceptions import PermissionDenied
from datetime import timezone
from django.core.exceptions import ObjectDoesNotExist


class SubmissionSerializer(dynamicserializer.DynamicFieldsModelSerializer):
    survey_data = surveyserializer.SurveySerializer(
        source='survey', 
        read_only=True, 
        fields=['name', 'id']
    )
    user_data= userserializer.UserSerializer(
        source='user', 
        read_only=True
    )
    submission_answers = answerserializer.AnswerSerializer(
        many=True, 
        required=True
    )
    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ('user',)
        
    def create(self, validated_data):
        answers_data = validated_data.pop('submission_answers')
        user = self.context['request'].user
        survey = validated_data.get('survey')

        # check that user can't submit the same survey more than once or survey is expired
        if Submission.objects.filter(survey=survey, user=user) or survey.deadline <= datetime.datetime.now(tz=timezone.utc):
            raise PermissionDenied()
    
        if answers_data:
            # create submission record
            submission = Submission.objects.create(user=user, **validated_data)
            for answer_data in answers_data:
                question = answer_data.pop('question')
                # if question type is text
                if question.type == 'TEXT-ANSWER':
                    text_answers = answer_data.pop('text_answer', None)
                    if text_answers:
                        # create record in Answer model for each question
                        answer = Answer.objects.create(submission=submission, question=question)
                        # create record in Text answer model
                        TextAnswer.objects.create(answer=answer, **text_answers)
                
                # if question type is integer or score
                elif question.type == 'INTEGER' or question.type == 'SCORE':
                    
                    integer_answers = answer_data.pop('integer_answer', None)
                    if integer_answers:
                        # create record in Answer model for each question
                        answer = Answer.objects.create(submission=submission, question=question)
                        # create record in integer answer model
                        IntegerAnswer.objects.create(answer=answer, **integer_answers)
                
                # if question type is radio or checkbox
                else:
                    options_answer = answer_data.pop('options_answers', None)
                    if options_answer:
                        answer = Answer.objects.create(submission=submission, question=question)
                        for option_data in options_answer:
                            # create Answer record for each choise
                            OptionAnswer.objects.create(answer=answer, **option_data)
            return submission 
            
        raise ObjectDoesNotExist
    
from survey.models import *
from . import userserializer, surveyserializer, answerserializer, dynamicserializer
from django.core.exceptions import PermissionDenied
from datetime import timezone


class SubmissionSerializer(dynamicserializer.DynamicFieldsModelSerializer):
    survey_data = surveyserializer.SurveySerializer(source='survey', read_only=True, fields=['name', 'id'])
    user_data= userserializer.UserSerializer(source='user', read_only=True)
    submission_answers = answerserializer.AnswerSerializer(many=True, required=True)
    class Meta:
        model = Submission
        fields = '__all__'
    
    def create(self, validated_data):
        answers_data = validated_data.pop('submission_answers')
        user = validated_data.get('user')
        survey = validated_data.get('survey')
    
        # check that user can't submit the same survey more than once or survey is expired
        if Submission.objects.filter(survey=survey, user=user) or survey.deadline <= datetime.now(tz=timezone.utc):
            raise PermissionDenied()
    
        # create submtion record
        submission = Submission.objects.create(**validated_data)
        for answer_data in answers_data:
            question = answer_data.pop('question')

            # if question type is text
            if int(question.type) == 1:
                text_answers = answer_data.pop('text_answers', None)
                if text_answers:
                    # create record in Answer model for each question
                    answer = Answer.objects.create(submission=submission, question=question)
                    # create record in Text answer model
                    TextAnswer.objects.create(answer=answer, **text_answers)
            
            # if question type is integer or score
            elif int(question.type) == 4 or int(question.type) == 5:
                
                integer_answers = answer_data.pop('integer_answers', None)
                if integer_answers:
                    # create record in Answer model for each question
                    answer = Answer.objects.create(submission=submission, question=question)
                    # create record in integer answer model
                    IntegerAnswer.objects.create(answer=answer, **integer_answers)
            
            # if question type is radio or checkbox
            else:
                options_answer = answer_data.pop('options_answers', None)
                if options_answer:
                    for option_data in options_answer:
                        # create Answer record for each choise
                        answer = Answer.objects.create(submission=submission, question=question)
                        OptionAnswer.objects.create(answer=answer, **option_data)

        return submission 
    
from django.contrib import admin
from survey.models.answer_model import Answer, IntegerAnswer, OptionAnswer, TextAnswer
from survey.models.question_model import Question, QuestionOption
from survey.models.submission_model import Submission
from survey.models.survey_model import Survey
from survey.models.user_model import User


# Register your models here.
admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(QuestionOption)
admin.site.register(User)
admin.site.register(Submission)
admin.site.register(Answer)
admin.site.register(TextAnswer)
admin.site.register(OptionAnswer)
admin.site.register(IntegerAnswer)
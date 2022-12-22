from rest_framework import routers
from survey.views import result, user_survey, user_submission, submission, survey

router = routers.DefaultRouter()

router.register(r'user/submission', user_submission.UserSubmissionView, 'usersubmissions')
router.register(r'submission', submission.SubmissionView, 'submission')
router.register(r'survey/user', user_survey.UserSurveyView, 'usersurveys')
router.register(r'survey', survey.SurveyView, 'survey')
router.register(r'expiredSurvey', result.ExpiredSurveyViewSet, 'expiredsurvey')

from survey.models.survey_model import Survey
from survey.models.question_model import Question
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from .test_setup import TestSetup


class SurveyTestCase(TestSetup):

    def test_create_survey_success(self):
        response = self.client.post(self.survey_url, 
                                    self.correct_survey_data,
                                    content_type='application/json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token)
    
        self.assertEqual(response.status_code, 201)
        
        #  ensure it creates records in the database
        self.assertEqual(Survey.objects.count(), 1)
        self.assertEqual(Question.objects.count(),
                            len(self.correct_survey_data['questions']))
            
    def test_create_invalid_deadline_survey_fail(self):
        response = self.client.post(self.survey_url, 
                                    self.invalid_survey_deadline,
                                    content_type='application/json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token)

        # ensure the survey has questions
        self.assertRaises(ValidationError)

    def test_create_no_questions_survey_fail(self):
        response = self.client.post(self.survey_url, 
                                    self.survey_with_no_questions,
                                    content_type='application/json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token)
        
        self.assertRaises(ObjectDoesNotExist)

    def test_update_survey_success(self):
        # Get the ID of an existing survey record
        self.setup_update_test()
    
        # update the survey record
        response = self.client.patch(self.update_survey_url.format(self.survey.id),
                                    self.valid_deadline_data,
                                    content_type='application/json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token,
                                    )

        # ensure that just the deadline is updated
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['deadline'], self.valid_deadline_data['deadline'])
        self.assertEqual(response.data['name'], self.survey.name)

    def test_update_invalid_deadline_survey_fail(self):
        # Get the ID of an existing survey record
        self.setup_update_test()
    
        # update the survey record
        response = self.client.patch(self.update_survey_url.format(self.survey.id),
                                    self.invalid_deadline,
                                    content_type='application/json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token,
                                    )
        self.assertRaises(ValidationError)

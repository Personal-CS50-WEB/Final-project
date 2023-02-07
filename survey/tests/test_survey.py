from django.test import TestCase, Client
from survey.serializers.surveyserializer import SurveySerializer
from survey.models.survey_model import Survey
from survey.models.question_model import Question
from django.contrib.auth import get_user_model
from datetime import timezone
import datetime
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from dateutil import parser

# Create your tests here.
class SurveyTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser', 
            email='testuser@x.com', 
            password='password123',
        )
        self.user.save()
        
        # Log in the user
        response = self.client.post('/auth/jwt/create', {
            'email':'testuser@x.com', 
            'password':'password123',
        })
        self.assertEqual(response.status_code, 200)
        self.token = response.data['access']

    def test_serializer(self):
    
        surveys_data = [
        {
            'name': 'Survey 1',
            'description': 'This is my first survey',
            'deadline': '2023-03-25T17:39:45.210000Z',
            "questions":[
                {
                    "options": [
                        {
                            "option": "Yes"
                        },
                        {
                            "option": "No"
                        }
                    ],
                    "type": "RADIO",
                    "text": "Are you happy with the work you are doing?"
                },
                {
                    "type": "TEXT-ANSWER",
                    "text": "Where are you from?"  
                }
            ]
        },
        {
            'name': 'Survey 2',
            'description': 'This is my second survey',
            'deadline': '2022-03-25T17:39:45.210000Z',
            "questions":[
                {
                    "options": [
                        {
                            "option": "Yes"
                        },
                        {
                            "option": "No"
                        }
                    ],
                    "type": "RADIO",
                    "text": "Are you happy with the work you are doing?"
                },
                {
                    "type": "TEXT-ANSWER",
                    "text": "Where are you?"  
                }
            ]
        },
        {
            'name': 'Survey 3',
            'description': 'This is my empty survey',
            'deadline': '2023-05-25T17:39:45.210000Z',
            
        }]
        for survey_data in surveys_data:

            request = self.client.post('/api/survey/user/', 
                                       survey_data,
                                       content_type='application/json',
                                       HTTP_AUTHORIZATION='JWT ' + self.token)
            request.user = self.user
            # ensure the survey has questions
            if not 'questions' in survey_data:
                self.assertRaises(ObjectDoesNotExist)
            else:
                serializer = SurveySerializer(data=survey_data,
                                              context={'request': request})
                
                # Ensure the survey serializer is valid
                self.assertTrue(serializer.is_valid())
    
                # ensure that the deadline is after the day survey created
                date = serializer.validated_data['deadline']
                if date <= datetime.datetime.now(tz=timezone.utc):
                    self.assertRaises(ValidationError)
                else:
                    self.assertEqual(request.status_code, 201)
                    
                    #  ensure it creates records in the database
                    self.assertEqual(Survey.objects.count(), 1)
                    self.assertEqual(Question.objects.count(),
                                     len(survey_data['questions']))
                
    def setup_update_test(self):
        self.survey = Survey.objects.create(
            name='Survey 1',
            description='This is my first survey',
            deadline='2023-03-25T17:39:45.210000Z',
            owner = self.user
        )

    def test_update_survey(self):
        # Get the ID of an existing survey record
        self.setup_update_test()
        surveys_data = [
             {
             'deadline':'2023-04-25T17:39:45.210000Z',
             'name': 'new name'
             },
             {
             'deadline':'2022-04-25T17:39:45.210000Z',
             'name': 'new name'
             }]
        for survey_data in surveys_data:
            # update the survey record
            response = self.client.patch('/api/survey/user/{}/'.format(self.survey.id),
                                        survey_data,
                                        content_type='application/json',
                                        HTTP_AUTHORIZATION='JWT ' + self.token,
                                        )
            response.user = self.user
            if  parser.parse(survey_data['deadline']) < datetime.datetime.now(tz=timezone.utc):
                        self.assertRaises(ValidationError)
            else:
                # ensure that just the deadline is updated
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.data['deadline'], survey_data['deadline'])
                self.assertEqual(response.data['name'], self.survey.name)

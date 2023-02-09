from django.test import TestCase, Client
from survey.models.survey_model import Survey
from django.contrib.auth import get_user_model


class TestSetup(TestCase):
    
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

        self.survey_url = '/api/survey/user/'
        self.update_survey_url = '/api/survey/user/{}/'
        self.correct_survey_data = {
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
        }
        self.invalid_survey_deadline = {
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
        }
        self.survey_with_no_questions = {
            'name': 'Survey 3',
            'description': 'This is my empty survey',
            'deadline': '2023-05-25T17:39:45.210000Z',
            
        }
        self.valid_deadline_data = {
            'deadline':'2025-04-25T17:39:45.210000Z',
            'name': 'new name'
            }
        self.invalid_deadline = {
            'deadline':'2022-04-25T17:39:45.210000Z'
        }

        return super().setUp()
    
    def tearDown(self) -> None:
        return super().tearDown()
    
    def setup_update_test(self):
        self.survey = Survey.objects.create(
            name='Survey 1',
            description='This is my first survey',
            deadline='2023-03-25T17:39:45.210000Z',
            owner = self.user
        )
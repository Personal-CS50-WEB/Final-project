# Survey
## Description:

 A DRF single app survey website for making, viewing, takeing surveys, and seeing results.

## Explaining the project:
- It is a single page application that allows user to toggle navbar and see list of active surveys and list of closed surveys by calling specific API.
- when user login or register user could create survey with different question types by calling API and select each question type.
- when user submit create survey form specific API will be called to store the new record in database and user will redirct to a page of user's surveys.
- The user who is authenticated could take survey and call API  to store the submission in data base, users could see their submissions on the surveys. 
- The survey creator can see list of his active surveys information like number of submissions, every submission answers and close or edit the deadline of the survey.
- Users can see closed survey result question by question.

## Technologies used:

### Backend:

#### Django REST framwork:
- Python.
- Django models.
- Djoser.
- postgreSQL.

### Frontend:
#### Javascript:
- React js.


**The project consists of:**
#### **Database layer**:

 **Using django models this project has nine models:**
 
 - User model : Contains user information like id, username, password, email.
 - Survey model: Contains survey information like id, survey creator, name and description of the survey, time created and deadline.
 - Question model : Has survey as foreign key, type of the question and the question text.
 - QuestionOption model : Has question as foreign key and the option for that question.
 - Submission model : Has survey as foreign key and the submission creator.
 - Answer model : Has submission and question as foreign keys.
 - TextAnswer model : Has Answer as foreign key and the text answer.
 - IntegerAnswer model : Has Answer as foreign key and the integer answer.
 - OptionAnswer model : Has Answer as foreign key and the option answers.

### **Business Layer:**
- **serializers files** : Containts serializers files for the models:

   - UserSerializer: Contains serializer class for user model.
   - AnswerSerializer: Containts serializers classes for the answer types, text, integer and option answer in addition to answer serializers for answer model which           contains the text answer, integer answer, option answers and question as childs in the nested serializer.
   - QuestionSerialezer: Containts serializers classes for option question and question class wich is nested daynamic serializer contains all question model fields           plus options and answers as childs.
   - SurveySerializer: Contains serializer class for survey model wich is nested dynamic serializer contains questions field as a child and total submissions as a read       only field.
     SurveySerializer used in survey view and user survey view as it is dynamic and each view could use the fields that serve each purpose.
     SurveySerializer contains create function that handels create new record in Survey model and it's child (Question model and  QuestionOption if the type of the         question require that). SurveySerializer also containt update function that allows to update just the survey deadline field.
   - SurveyResultSerializer: Contains serializer class for survey model wich is nested dynamic serializer contains submissions and questions fileds as childs of the         parent class, using that serializer in result view to represent the closed survey data.
   - SubmissionSerializer:  Contains serializer class for submission model wich is nested dynamic serializer contains submission answers field as a child,     SubmissionSerializer contains create function that handels create new record in Submission model and it's child Answer model and depending on question type (radio, checkbox, text, integer or score) new record in TextAnswer or IntegerAnswer or OptionAnswer will be created.
   

- **views files**: Containts the views files.

  - SurveyView: using DRF viewset class SurveyView is read only class that allows to list active surveys or retrive one survey using surveyserializer as              serializer_class.
  - SubmissionView: using DRF mixins class SubmissionView is mixins.CreateModelMixin, mixins.ListModelMixin, class that allows to create new record in Submission model      and list submissions for one survey using SubmissionSerializer as serializer_class.
  - ExpiredSurveyViewSet: using DRF viewset class SurveyView is read only class that allows to list closed surveys or retrive one survey using surveyresultserializer      as serializer_class.
  - UserSubmissionView: using DRF mixins class SubmissionView is read only class that allows to  list submissions for surveys the user submit and  retrive one    submission  using SubmissionSerializer as serializer_class and IsAuthenticated as permission_classes.
  - UserSurveyView: using DRF mixins class SubmissionView is mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, class that allows user who is   Authenticated to create new  record in Survet model, list that user surveys and update deadline for surveys (using IsOwner permission class) using SurveySerializer as serializer_class.
  - TypesAPIView : view allows to get question types.


- **urls.py file** : Containts the APIs paths.
- **routers.py file** : Containts the routes for every view.


- **Authentication**:
   - using djoser for Django Rest Framework views to handle basic actions such as registration, login, logout and account activation by using endpoints djoser provides.
   - using JSON Web Token Authentication .
   - users login or reqister by email instead on username.

### **UI:**
 ### **react** : 
 **src folder**:
- **app.js**: Has all main componants as routes.
- **app.css**: Contains style for the pages.
- **Container folder**: has jsx files for main componants.
-  **Helper folder:** has helper jsx files that used in main componants.
-  **actions folder**: has jsx files that contains functions used in main componants.
-  **Componants folder**: has jsx file for navbar componant.
-  **hocs folder:** Contains layout function that do authentication check.


## Possible improvements

- Have categories for the survey that could sort surveys.
-  Do pagination.
- Add unit tests for the project.
- Notificaitons to survey creator by sending email about survey result when survey closes.

## How to launch application

1. Clone the code : https://github.com/Personal-CS50-WEB/Final-project.git
2. pip install -r requirements.txt
3. In terminal, python manage.py makemigrations network to make migrations for the network app.
4. python manage.py migrate
5. python manage.py runserver
6. in frontend directory, npm install 
7. npm start

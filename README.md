# Survey

## Distinctiveness and Complexity
 A Django REST Framework (DRF) single app plateform for creating, viewing, participating in surveys, and viewing the results.

### - Explaining the project:
  - It is a single page application that allows users to toggle navbar and see list of active surveys and list of closed surveys by calling specific API.
  - When a user logs in or registers, users can create surveys with different question types by calling API and selecting each question type.
  - When a user submits a create survey form a specific API will be called to store the new record in the database and the user will redirect to a page of the user's surveys.
  - The user who is authenticated could take survey and call API  to store the submission in database, users could see their submissions on the surveys. 
  - The survey creator can see a list of his active surveys information like number of submissions, every submission answers and close or edit the deadline of the survey.
  - Users can see closed survey results question by question.
  - The web page  is mobile-responsive.

### - Technologies used:

   ### Backend:

   #### Django REST framework:
   - Python.
   - Django models.
   - Djoser.
   - postgreSQL.

   ### Frontend:
   #### Javascript:
   - React js.


## **The project consists of:**
### **Database layer**:

 **Using django models this project has nine models:**
 
 - User model : Contains users information: id, username, password, email.
 - Survey model: Contains surveys information: id, survey creator, name and description of the survey, time created and deadline.
 - Question model : Contains questions information and it refernces the survey as foreign key, type of the question and the question text.
 - QuestionOption model : Represents a single option out of multiple options. It's used when the question type is sinlge or multiselect. It has question as foreign key.
 - Submission model : Represents a single submission to a survey by a specific user. It has the survey as foreign key and the submission creator.
 - Answer model : Represents a single answer to a question. It has the submission and the question as foreign keys.
 - TextAnswer model : Represents a text answer to a question when the question type is Text. It has the Answer as foreign key and the text answer.
 - IntegerAnswer model : Has Answer as foreign key and the integer answer.
 - OptionAnswer model : Has Answer as foreign key and the option answers.

### **Business Layer:**
- **serializers files** : Contains serializers files for the models:

   - UserSerializer: Contains serializer class for user model.
   - AnswerSerializer: Contains serializers classes for the answer types, text, integer and option answer in addition to answer serializers for answer model which           contains the text answer, integer answer, option answers and question as childs in the nested serializer.
   - QuestionSerialezer: Contains serializers classes for option question and question class which is nested dynamic serializer contains all question model fields           plus options and answers as childs.
   - SurveySerializer: Contains serializer class for survey model which is a nested dynamic serializer containing questions field as a child and total submissions as a read only field.
     SurveySerializer used in survey view and user survey view as it is dynamic and each view could use the fields that serve each purpose.
     SurveySerializer contains create function that handles creating new records in Survey model and its child (Question model and  QuestionOption if the type of the         question requires that). SurveySerializer also contains update function that allows to update just the survey deadline field.
   - SurveyResultSerializer: Contains serializer class for survey model wich is nested dynamic serializer contains submissions and questions fields as childs of the         parent class, using that serializer in result view to represent the closed survey data.
   - SubmissionSerializer:  Contains serializer class for submission model wich is nested dynamic serializer contains submission answers field as a child,     SubmissionSerializer contains create function that handles create new record in Submission model and it's child Answer model and depending on question type (radio, checkbox, text, integer or score) new record in TextAnswer or IntegerAnswer or OptionAnswer will be created.
   

- **views files**: Contains the views files.

  - SurveyView: using DRF viewset class SurveyView is read only class that allows to list active surveys or retrieve one survey using  SurveySerializer as              serializer_class.
  - SubmissionView: using DRF mixins class SubmissionView is mixins.CreateModelMixin, mixins.ListModelMixin, class that allows to create new record in Submission model      and list submissions for one survey using SubmissionSerializer as serializer_class.
  - ExpiredSurveyViewSet: using DRF viewset class SurveyView is read only class that allows to list closed surveys or retrieve one survey using SurveyResultSerializer   as serializer_class.
  - UserSubmissionView: using DRF mixins class SubmissionView is read only class that allows to  list submissions for surveys the user submit and  retrieve one    submission  using SubmissionSerializer as serializer_class and IsAuthenticated as permission_classes.
  - UserSurveyView: using DRF mixins class SubmissionView is mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, class that allows user who is   Authenticated to create new  record in Survey model, list that user surveys and update deadline for surveys (using IsOwner permission class) using SurveySerializer as serializer_class.
  - TypesAPIView : view allows users to get question types.


- **urls.py file** : Contains the APIs paths.
- **routers.py file** : Contains the routes for every view.


- **Authentication**:
   - using Djoser for Django Rest Framework views to handle basic actions such as registration, login, logout and account activation by using endpoints Djoser provides.
   - using JSON Web Token Authentication .
   - users login or register by email instead of username.

### **UI:**
 ### **react** : 
 **src folder**:
- **app.js**: Has all main components as routes.

- **app.css**: Contains style for the pages.

- **Container folder**: Has jsx files for main components.
   - create_survey.jsx: Has a form with the survey fields and when it is submitted create function from actions folder will be called to call API in a post request to create a record for that new survey.
    - home.jsx: Has the home page component that calls API to get the active surveys and render a list of those surveys using SuveyCard components from the helper folder.
    - user_surveys.jsx:  Contains a component that calls API to get the users surveys and render those surveys using Table components from the helper folder and allows the user to edit each survey deadline or close the survey by clicking a specific button and call edit function from actions folder that calls API in a patch request to update the data.
    - user_submissions.jsx:  Contains component that calls API to get the users submissions on the surveys and render those surveys using Table components from the helper folder.
    - survey_submissions.jsx:  Contains a component that calls API to get the submissions on specific surveys and render those surveys using Table components from the helper folder.
    - submission.jsx:  Contains a component that calls API to get a submission by its id and render it using Answer components from the helper folder.
    - results.jsx: Has the results component that calls API to get the closed surveys and render a list of those surveys using SuveyCard components from the helper folder.
    - result.jsx: Has the result component that calls API to get a closed survey  by its id and render a result of each question in that survey using question components from the helper folder.
    - login.jsx: Has a form for login thatcalls login function from actions folder and allows user to login.
    - signup.jsx: Has a form for signup that calls login componant when account created to let users login.
    - activate.jsx: Has a form for activate the new users.
 
-  **Helper folder:** Has helper jsx files that are used in main components.
   - create survey folder: Has two child components: SurveyInfoFields in survey_info.jsx for survey information fields and QuestionFields in question_info.jsx for each question fields.
   -  List survey folder: Has a child component: SurveyCard in surveys.jsx that renders survey.
   -  User surveys folder:  Has two child components: Table in user_surveys.jsx for survey information and ModalForm in modal_form.jsx that enables the user to update each survey deadline.
   -  Submissions folder: Has two child components: Answer in answer.jsx for one submission answers and Table in submissions.jsx for the submissions information.
   -  Take survey folder: Has Question components in question.jsx file that has TextQuestion in text_question.jsx file, NumQuestion in num_question.jsx file, CheckboxQuestion and RadioQuestion  in choice_question.jsx file as childs components.
   - Result folder: Has result components in result.jsx file that has TextAnswer in text_answer.jsx file, NumberAnswer in num_answer.jsx file and ChoiceAnswer in choice_answer.jsx file as childs components.

-  **actions folder**: Has  jsx files that contain functions used in main components.
   - survey.jsx: 
       - create function that checks the access token and refresh it if needed then calls API and make a post request with data as the body and access token in the header.
       -  edit function that checks the access token and refreshes it if needed then calls API and makes patch request with the new deadline and access token in the header.
    - submit.jsx : Has a submit  function that checks the access token and refresh it if needed then calls API and makes a post request with the submission data as the body and access token in the header.
    - types.js: Has types for authentication.
    - auth.jsx: Has functions used in authentication:
       checkAuthenticated,  loud_user,  Login,  signup, verify and  logout functions
-  **Components folder**: Has a jsx file for the navbar component which has the main pages links and login/signup or log out depending on if the user is authenticated or not.
-  **Hocs folder:** Contains a layout function that does authentication checks.
-  **reducers folder:** Has a function that returns state depending on the type.

## How to start the app

### Prerequisits:
Python 3.6 or later installed.

### Steps to run it:
1. Clone the code : https://github.com/Personal-CS50-WEB/Final-project.git
2. pip install -r requirements.txt
3. In the terminal, python manage.py makemigrations network to make migrations for the network app.
4. python manage.py migrate
5. python manage.py runserver
6. in frontend directory, npm install 
7. npm start

## Future work and improvements

- Have categories for the survey that could sort surveys.
-  Do pagination.
- Add unit tests for the project.
- Notifications to survey creators by sending email about survey results when survey closes.

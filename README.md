# Survey

## Distinctiveness and Complexity
 It is a survey platform application where users can create, view, and participate in surveys. It consists of two applications that were developed independently; A backend app that was developed using Django REST framework and a Frontend app that was developed using React.js.

### Functional Requirements
  - Users can create an account using her email.
  - Registered users can create, participate in open surveys, view results of closed surveys.
  - The creator user can set the survey deadline. After the deadline, no responses can be submitted.
  - Any user can view the survey results once the deadline is reached.
  - A survey contains one or more questions, each question has a type that describes how the users can respond to it.
  - There are five types of question responses: text, numerical, score, single, and multi select options.
  - A registered user can participate in any open survey once.
  - Users can view a list of active surveys.
  - A User can see a list of her own past submissions with details.
  - The creator user can view her own active surveys and change the deadline or close any.
  - Users can view a list of the closed surveys with results details.
  - Survey results contain a a grouped results for each question based on question type:
    - A text question: List of text responses.
    - A numerical question: Number and percentage of responses for each number.
    - Single and multi select: Number and percentage of each selected option. 

### Technologies used:

   #### Backend:
   
   Django REST framework:
   - Python.
   - Django models.
   - Djoser.
   - postgreSQL.
   
   #### Frontend:
   
   The web application is mobile-responsive using Javascript:
   - React js.

## Starting the app

#### Prerequisites
- Python 3.6 or later installed.
- Node.js latest version.
#### Steps
1. Clone the code : https://github.com/Personal-CS50-WEB/Final-project.git
2. Run: `pip install -r requirements.txt`
3. Run:` python manage.py makemigrations` to make migrations.
4. Run: `python manage.py migrate`
5. Run: `python manage.py runserver`
6. In frontend directory, Run: `npm install` 
7. Run: `npm start`

## **The Backend**
It is developed using Django REST Framework (DRF) which is an application used for rapidly building RESTful APIs based on Django models and Postgres DB. It was developed completely separate from the frontend. I was able to complete the backend and test it before starting the frontend development.

But first, Let's define the entities of the system.
  
  ### **Entities**
 - User: Represents users main information.
 - Survey: Represents surveys information and a list of questions in each survey.  
 - Question: Represents questions information like text and type (out of a predefined list of types). If the question requires a list of options (answers) for the user to select from. A list of those options are included as well. 
 - QuestionOption: Represents a single option.
 - Submission: Represents submissions, a submission is a user's response to a survey, thus it contains a list of answers.
 - Answer: Represents answers, an answer is a user's response to a question, the answer can take different forms depending on the question type.
 - Text Answer: Represents a text answer to a question when the question type is Text.
 - Integer Answer: Represents an integer answer to a question when the question type is integer.
 - Option Answer model : Represents an options answer to a question when the question type is single or multi selection.
  
Then, Django REST Framework was used to model those entities, apply business rules, develop and expose REST APIs. To achieve that, I had to use the following components of DRF:

   ### **Models**
 - Django Models are a level of abstraction on top of SQL that works with databases using Python classes and objects rather than direct SQL queries. Generally, each model maps to a single database table.Each attribute of the model represents a database field.
  - By using the ` python manage.py makemigrations ` command create some Python files that will create or edit our database to be able to store what is in the models and apply these migrations to our database by running `python manage.py migrate`  command.
  - Using django models this project has nine models one model for each entity:
     - User model : Contains users information: id, username, password, email.
     - Survey model: Contains surveys information: id, survey creator, name and description of the survey, time created and deadline.
     - Question model : Contains questions information and it references the survey as foreign key, type of the question and the question text.
     - QuestionOption model : Represents a single option out of multiple options. It's used when the question type is single or multiselect. It has  question as foreign key.
     - Submission model : Represents a single submission to a survey by a specific user. It has the survey as foreign key and the submission creator.
     - Answer model : Represents a single answer to a question. It has the submission and the question as foreign keys.
     - TextAnswer model : Represents a text answer to a question when the question type is Text. It has the Answer as foreign key and the text answer.
     - IntegerAnswer model : Has Answer as foreign key and the integer answer.
     - OptionAnswer model : Has Answer as foreign key and the option answers.

 
  	![alt text](https://github.com/olamakhlouf/Final-project/blob/project/Survey_DB_Diagram.png?raw=true)
   
  ### **Serializers**
  
  - Using DRF provides a Serializer class which gives a way to control the output the responses, as well as a ModelSerializer class which provides a useful shortcut for creating serializers that deal with model instances and querysets.
  - Using serializers classes to convert model instances into JSON and adding the required logic.
  - Each entity needs at least one serializer to convert model instances into JSON.
  - Survey Entity needed two serializers, one to handle viewing, updating,and creating survey questions and the other to handle viewing the submissions of that survey.
  - The serializers used in this project:
      - UserSerializer: Contains serializer class for user model.
      - AnswerSerializer: Contains serializers classes for the answer types, text, integer and option answer in addition to answer serializers for answer model which           contains the text answer, integer answer, option answers and question as childs in the nested serializer.
      - QuestionSerialezer: Contains serializers classes for option question and question class which is a nested dynamic serializer containing all question model fields           plus options and answers as childs.
      - SurveySerializer: Contains serializer class for survey model which is a nested dynamic serializer containing questions field as a child and total submissions as a read only field.
        SurveySerializer used in survey view and user survey view as it is dynamic and each view could use the fields that serve each purpose.
        SurveySerializer contains a  create function that handles creating new records in Survey model and its child (Question model and  QuestionOption if the type of the question requires that). SurveySerializer also contains an update function that allows updating just the survey deadline field.
      - SurveyResultSerializer: Contains serializer class for survey model which is a nested dynamic serializer contains submissions and questions fields as childs of the parent class, using that serializer in result view to represent the closed survey data.
      - SubmissionSerializer:  Contains serializer class for submission model wich is nested dynamic serializer contains submission answers field as a child,     SubmissionSerializer contains create function that handles create new record in Submission model and it's child Answer model and depending on question type (radio, checkbox, text, integer or score) new record in TextAnswer or IntegerAnswer or OptionAnswer will be created.

  
  ### **Views**
  A ModelViewSet class is simply a type of class-based View, The actions provided by the ModelViewSet class are .list(), .retrieve(), .create(), .update(), .partial_update(), and .destroy().
  - DRF provides Custom ViewSet base classes that do not have the full set of ModelViewSet actions which is used in this project.
  - To create a base viewset class that provides create, list and retrieve operations, inherit from GenericViewSet, and mixin the required actions.
  - Mapping operations on entities to views:
     - SurveyView: using DRF viewset class SurveyView is read only class that allows to list active surveys or retrieve one survey using SurveySerializer as serializer_class.
     - SubmissionView: using DRF mixins class SubmissionView extends mixins.CreateModelMixin and mixins.ListModelMixin classes that allows to create new record in Submission model and list submissions for one survey using SubmissionSerializer as serializer_class.
     - ExpiredSurveyViewSet: using DRF viewset class SurveyView is read only class that allows to list closed surveys or retrieve one survey using SurveyResultSerializer   as serializer_class.
     - UserSubmissionView: using DRF mixins class SubmissionView is read only class that allows to  list submissions for surveys the user submit and  retrieve one    submission using SubmissionSerializer as serializer_class and IsAuthenticated as permission_classes.
     - UserSurveyView: using DRF mixins class SubmissionView extends mixins.CreateModelMixin, mixins.ListModelMixin and mixins.UpdateModelMixin classes that allows   an authenticated user to create new  record in Survey model, list that user surveys, and update deadline for surveys (using IsOwner permission class) using SurveySerializer as serializer_class.
     - TypesAPIView : view allows users to get question types.

  
  ### **Securing the backend**
  I used Djoser for Django Rest Framework views to handle basic actions. I used JSON Web Token Authentication to secure the APIs.
  Djoser provides endpoints to enable the following:
   - Register and activate an account by email.
   - Verify and refresh the access token.
   - Login, logout.
  
Finally, APIs were defined on on top of those views using the following files:
 - **routers.py file** : Contains the routes for every view.
 - **urls.py file** : Contains the APIs paths.

The following is the list of exposed APIs for the frontend to use:

    - survey/user: /api/survey/user/
    - survey: /api/survey/
    - expiredSurvey: /api/expiredSurvey/
    - user/submission: /api/user/submission/
    - submission: /api/submission/
    
## **The Frontend:**
 ### **React** : 
 React is a flexible JavaScript library for building user interfaces.
 **src folder**:
- **app.js**: Has all main components as routes.

- **app.css**: Contains style for the pages.

- **Container folder**: Has jsx files for main components.
   - create_survey.jsx: Has a form with the survey fields and when it is submitted it calls 'create' function from actions folder to call API in a post request that creates a record for that new survey.
    - home.jsx: Has the home page component that calls API to get the active surveys and render a list of those surveys using SurveyCard components from the helper folder.
    - user_surveys.jsx: Contains a component that calls API to get the users surveys and render those surveys using 'Table' components from the helper folder. Also, it allows the user to edit each survey deadline or close the survey by calling 'edit' function from actions folder that calls API in a patch request to update the data.
    - user_submissions.jsx:  Contains a component that calls API to get the users submissions on the surveys and render those surveys using 'Table' components from the helper folder.
    - survey_submissions.jsx:  Contains a component that calls API to get the submissions on specific surveys and render those surveys using 'Table' components from the helper folder.
    - submission.jsx:  Contains a component that calls API to get a submission by its id and render it using 'Answer' components from the helper folder.
    - results.jsx: Has the results component that calls API to get the closed surveys and render a list of those surveys using 'SurveyCard' components from the helper folder.
    - result.jsx: Has the result component that calls API to get a closed survey by its id and render a result of each question in that survey using 'Question' components from the helper folder.
    - login.jsx: Has a form for login thatcalls 'login' function from actions folder and allows the user to login.
    - signup.jsx: Has a form for signup that calls the 'login' component when account created to let users login.
    - activate.jsx: Has a form for activating new users.
 
-  **Helper folder:** Has helper jsx files that are used in main components:
   - create survey folder: Has two child components: 'SurveyInfoFields' in 'survey_info.jsx' for survey information fields and 'QuestionFields' in 'question_info.jsx' for each question fields.
   -  List survey folder: Has a child component 'SurveyCard' in 'surveys.jsx' that renders surveys.
   -  User surveys folder:  Has two child components: 'Table' in 'user_surveys.jsx 'for survey information and 'ModalForm' in 'modal_form.jsx' that enables the user to update each survey deadline.
   -  Submissions folder: Has two child components 'Answer' in 'answer.jsx' for one submission answers and 'Table' in 'submissions.jsx' for the submissions information.
   -  Take survey folder: Has 'Question' components in 'question.jsx' file that has 'TextQuestion' in 'text_question.jsx' file, 'NumQuestion' in 'num_question.jsx' file, 'CheckboxQuestion' and 'RadioQuestion'  in 'choice_question.jsx' file as childs components.
   - Result folder: Has 'result' components in 'result.jsx' file that has 'TextAnswer' in 'text_answer.jsx' file, 'NumberAnswer' in 'num_answer.jsx' file and 'ChoiceAnswer' in 'choice_answer.jsx' file as childs components.

-  **actions folder**: Has jsx files that contain functions used in main components.
   - survey.jsx: 
       - 'create' function that checks the access token and refresh it if needed then calls API and makes a post request with data as the body and access token in the header.
       - 'edit' function that checks the access token and refreshes it if needed then calls API and makes a patch request with the new deadline and access token in the header.
    - submit.jsx : Has 'submit'  function that checks the access token and refreshes it if needed then calls API and makes a post request with the submission data as the body and access token in the header.
    - types.js: Has types for authentication.
    - auth.jsx: Has functions used in authentication:
       'checkAuthenticated', 'loud_user', 'Login', 'signup', 'verify' and 'logout' functions
-  **Components folder**: Has a jsx file for the navbar component which has the main pages links and login/signup or log out depending on if the user is authenticated or not.
-  **Hocs folder:** Contains a 'layout' function that does authentication checks.
-  **reducers folder:** Has a function that returns state depending on the type.

## Future work and improvements

- Add a category field to the survey that could be used to filter surveys.
-  Do pagination to tables.
- Add unit tests to the project.
- Email notifications to survey creators about survey results when it closes.

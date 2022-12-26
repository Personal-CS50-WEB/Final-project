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
 Using django models this project has nine models:
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
- views folder: Containts the views files.
- serializers : Containts serializers files for the models.

the Api used to get/delete/update information from models.py file.
- urls.py file : Containts the routes and apis paths.

### **UI:**
 ### **react** : 



## How to launch application

1. Clone the code : https://github.com/Personal-CS50-WEB/Final-project.git
2. pip install -r requirements.txt
3. In terminal, python manage.py makemigrations network to make migrations for the network app.
4. python manage.py migrate
5. python manage.py runserver
6. in frontend directory, npm install 
7. npm start

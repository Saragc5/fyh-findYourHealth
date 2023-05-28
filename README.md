# FYH (Find Your Health)
Website where you can find a health professional among trainers, physical therapists and nutritionists who offers their services near by you.

## Presentation
Hi there!👋 my name is Sara Gutiérrez Cortizo and this is my final project for CodeSpace Academy bootcamp, Full Stack Developer.

For the frontend part I have used ReactJS and SASS with CSS modules and for the backend part I have used NodeJS with Express.

For the database I have used MongoDB.

As security for the endpoints that need it, I have used bcrypt for password encryption and for the use of credentials through tokens, jsonwebtoken.


## The project has the following functionalities:
* Receive information from  users and blog database. 
* Create, modify and delete user profile with text and image data.
* Discriminate between one type of user and another to show different functionalities.
* Create new articles for the blog with text and image, not all users can do that.
* Contact form with administrators that reaches a database  for later response.
* Password modification and time to expire the session.
* It is fully responsive. The user profile also has the option of viewing it in phone size.

# Getting started
## 1. Requirements
Please check if you have everything installed, like apache2, npm and mongodb.

It will use ReactJs and NodeJS, MongoDB for database.
## 2. Installing (getting my project from Github)
  git clone https://github.com/Saragc5/Codespace-final-project.git  
  open it in Visual Studio Code (or the code editor that you have)

## 3. Running the project:
### Import MongoDB file to your DB:
 * Open the Terminal and run: mongo (to connect to the server) 
 * With the Terminal, go to the directory where you have cloned the database that you want to import and run:
	* mongorestore --db fyh --archive=fyh.json
	* show databases
	* use fyh
	* show collections
There you will see 3 collections: blogarticles, contactforms and users.

#### Backend:
Open the project in: Codespace-final-project and install the dependencies in the directory Backend-component/server:
npm install
 
and then:
npm start

#### Frontend:
Open the project in: Frontend_component and install the dependencies:
npm install
and then:
npm start

##### You are ready to start!

## Some endpoints from the project:


|        | URL                                           |                                                            | ROLE              |
|--------|-----------------------------------------------|------------------------------------------------------------|-------------------|
| GET    | localhost:9000/blog                           | Get a list of published articles                           | Public            |
| GET    | localhost:9000/blog/:id                       | Get one article                                            | Public            |
| POST   | localhost:9000/blog/newBlogArticle            | Create a new article with text and image and publish it    | User Prof & Admin |
| GET    | localhost:9000/users                          | Get a list of professionals showing a short information    | User & Admin      |
| GET    | localhost:9000/users/:id                      | Read total info about one professional                     | User & Admin      |
| GET    | localhost:9000/users/getuser/:id              | Verify user identity when log in via token and get profile | User & Admin      |
| POST   | localhost:9000/users/register                 | Register a new user                                        | Public            |
| PATCH  | localhost:9000/profile/categoryprof/:id       | Edit profile text details                                  | User              |
| POST   | localhost:9000/api/modifyPassword             | Edit the password                                          | User              |
| POST   | localhost:9000/users/profile/uploadimage/:id  | Upload an image from user profile                          | User              |
| DELETE | localhost:9000/users/profile/categoryprof/:id | Delete user profile                                        | User              |
| POST   | localhost:9000/contact                        | Contact to the website admin                               | Public            |
| POST   | localhost:9000/login                          | Login                                                      | User & Admin      |

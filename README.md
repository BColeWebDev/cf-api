# CF-API

Crown Fitness REST API

- User Authentication 
- Full CRUD functionality work excercises, regiments, training days\
- 
### Server <img height="20" src="https://pic.onlinewebfonts.com/svg/img_569193.png"></img>

| Verb   | Endpoint                    | Result                | Body   | 
| ------ | --------------------------- | --------------------- | ------ | 
| POST   | /api/auth/login             | Login User            |  {email, password}   | /api/auth/login             |
| POST   | /api/auth/register          | Create User           |  {first_name, last_name, email, password, bio,experience, crown_member,age, sex}   | /api/auth/register          
| POST   | /api/auth/register/cancel   | Cancel User           |
| POST   | /api/auth/login/forgot-password| Forgot Password          |
| POST   | /api/auth/authO         | Google Login *W.I.P*       |
| GET    | /api/workouts/regiments           | Get all regiments     |
| POST   |  /api/workouts/createRegiment           | Create regiment       |
| GET   |  /api/workouts/regimentsAll/:id           | Get all regiment       |
| GET   |  /api/workouts/singleRegiment/:id           | Get single regiment       |
| PUT    |/api/workouts/singleRegiment/:id       | Update regiment       |
| DELETE | /api/workouts/singleRegiment/:id       | Delete regiment       |
| GET    | /api/workouts/trainingdays/:id                 | Get all training days |
| GET    | /api/workouts/singleTrainingDay/:id                 | Get single training days |
| POST    | /api/workouts/trainingdays/:id                | Create a training day |
| PUT    |  /api/workouts/trainingdays/:id             | Update a training day |
| DELETE |  /api/workouts/trainingdays/:id           | Delete a training day |
| GET    | /api/workouts/routines/:id     | Get all exercises     |
| POST   | /api/workouts/routines/:id          | Create a exercises    |
| PUT    | /api/workouts/routines/:id | Update a exercises    |
| DELETE | /api/workouts/routines/:idd | Delete a exercises    |

## 1- Download

```sh
git clone https://github.com/BColeWebDev/exercise-app.git

cd cf-api

place .env file with all environments variables required at root folder
```

## 2- ENV Variables
```sh
PORT=
MONGO_URL_TEST=
MONGO_URL=
JWT_SECRET=
SENDGRID_API_KEY=
SENDING_EMAIL=
HOST=
CC_DISABLE_AUTH=
APP_URL=
API_HOST_EXERCISES=
API_KEY_EXERCISES=
API_URL_EXERCISES=
```

# CF-API

Crown Fitness REST API

- User Authentication 
- Full CRUD functionality work excercises, regiments, training days\
- 
### Server <img height="20" src="https://pic.onlinewebfonts.com/svg/img_569193.png"></img>

| Verb   | Endpoint                    | Result                |
| ------ | --------------------------- | --------------------- |
| POST   | /api/v1/users/login         | Login User            |
| POST   | /api/v1/users/register      | Create User           |
| POST   | /api/v1/users/authO         | Google Login          |
| GET    | /api/v1/regiments           | Get all regiments     |
| POST   | /api/v1/regiments           | Create regiment       |
| PUT    | /api/v1/regiments/:id       | Update regiment       |
| DELETE | /api/v1/regiments/:id       | Delete regiment       |
| GET    | /api/v1/day                 | Get all training days |
| POST   | /api/v1/day                 | Create a training day |
| PUT    | /api/v1/day/:id             | Update a training day |
| DELETE | /api/v1/day/:id             | Delete a training day |
| GET    | /api/v1/exercises/plans     | Get all exercises     |
| POST   | /api/v1/exercises/plans     | Create a exercises    |
| PUT    | /api/v1/exercises/plans/:id | Update a exercises    |
| DELETE | /api/v1/exercises/plans/:id | Delete a exercises    |

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

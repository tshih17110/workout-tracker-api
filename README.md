# workout-tracker-api




## Quick Start

### Setup .env file
1. Follow the [MongoDB Atlas guide](https://www.mongodb.com/docs/guides/atlas/connection-string/) to retrieve `MONGO_URI`.
2. Fill out `JWT_SECRET`


Run project
```
npm start
```

Run unit tests
```
npm test
```

## Routes

**Auth**:\
`POST /auth/register - register`\
`POST /auth/login - login`

**User**:\
	`POST /users - create user`\
	`GET /users - get all users`\
	`GET /users/:userId - get user`\
	`DELETE /users/:userId - delete user`

**Exercise**:\
	`POST /exercise - create exercise`\
	`GET /exercise - get all exercises`\
	`GET /exercise/:exerciseId - get exercise`\
	`DELETE /exercise/:exerciseId - delete exercise`

**Workout**:\
	`POST /workout - create workout`\
	`GET /workout - get all workouts`\
	`GET /workout/:workoutId - get workout`\
	`DELETE /workout/:workoutId - delete exercise`

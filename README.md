# Gobarber API
Backend of the GoBarber system, an application that allows Barbers and their customers book and manage appointments

## Routes

### /sessions

- POST /
Starts a new session for a registered user. The user's credentials must be sent in a JSON by the request body 
 with the format:
 ```
	{
		"email": string,
		"password": string
	}
```
Response: A JSON with the user data and the token for authenticated-only requests

### /users

- POST /
Registers a new user. The new user's informations must be sent in a JSON by the request body with the format:
```
	{
		"name": string,
		"email": string,
		"password": string
	}
```

- PATCH /avatar
Updates the user's avatar. The image must be sent in a multipart form by the request body with the name 'avatar'. Also, the token must be sent as a Bearer Token


### /appointments

- POST /
Creates a new appointment. The request body must receive a JSON with the provider ID, which is the ID of the user who is booking the appointment, and the appointment date. Also, the token must be sent as a Bearer Token
```
	{
		"providerId": uuid,
		"date": iso-8601 date
	}
```

- GET /
Lists all the appointments made by the user. The token must be sent as a Bearer Token.

# Habit Tracker API Reference

This file contains a description of each API endpoint used by the Habit Tracker app. The API is broken into several parts: Auth, Task, and Habit.

#### Response

> These responses are possible with any API endpoint.

| Status Code | Content                             |
| ----------- | ----------------------------------- |
| 404         | { message: "Resource Not Found" }   |
| 5XX         | { message: string, status: number } |

> This response is possible for any API endpoint that requires authentication.

| Status Code | Content                          |
| ----------- | -------------------------------- |
| 401         | { message: string, status: 401 } |

---

## Auth Endpoints

### POST `/api/auth/register`

> Create a new user account

#### Request Body

| Property | Type   | Requirements                          |
| -------- | ------ | ------------------------------------- |
| email    | string | Valid email address                   |
| username | string | Alphanumeric with underscores         |
|          |        | Contain at least one letter or number |
|          |        | Between 6 and 20 characters long      |
| password | string | At least 8 characters long            |
| confirm  | string | Must match password                   |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 201         | { username: string }                         |

### POST `/api/auth/login`

> Log into an existing user account

#### Request Body

| Property | Type   | Requirements                        |
| -------- | ------ | ----------------------------------- |
| username | string | Valid username/password combination |
| password | string | Valid username/password combination |

#### Response

| Status Code | Content                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] }                              |
| 409         | { error: string }                                                         |
| 200         | { token: string, user: { _id: string, username: string, email: string } } |

### GET `/api/auth/user` (**Requires Auth**)

> Get the current logged in user

#### Response

| Status Code | Content                                                    |
| ----------- | ---------------------------------------------------------- |
| 404         | { error: string }                                          |
| 200         | { user: { _id: string, username: string, email: string } } |

## Task Endpoints

### GET `/api/task` (**Requires Auth**)

> Get tasks within a date range

#### Request Query

| Property | Type   | Requirements                   |
| -------- | ------ | ------------------------------ |
| start    | string | Matches the pattern YYYY-mm-dd |
| end      | string | Matches the pattern YYYY-mm-dd |
|          |        | Cannot be before start         |

#### Response

| Status Code | Content                                                                                 |
| ----------- | --------------------------------------------------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] }                                            |
| 200         | [{ _id: string, title: string, description: string, date: string, completed: boolean }] |

### GET `/api/task/:id` (**Requires Auth**)

> Get a single task by its id

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Response

| Status Code | Content                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] }                                          |
| 404         | {error: string}                                                                       |
| 200         | { _id: string, title: string, description: string, date: string, completed: boolean } |

### POST `/api/task` (**Requires Auth**)

> Create a new task

#### Request Body

| Property    | Type   | Requirements                     |
| ----------- | ------ | -------------------------------- |
| title       | string | Between 3 and 64 characters long |
|             |        | Contain at least one letter      |
| description | string | Not longer than 128 characters   |
| date        | string | Matches the pattern YYYY-mm-dd   |

#### Response

| Status Code | Content                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] }                                          |
| 201         | { _id: string, title: string, description: string, date: string, completed: boolean } |

### PUT `/api/task/:id` (**Requires Auth**)

> Edit an existing task

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Request Body

| Property    | Type   | Requirements                     |
| ----------- | ------ | -------------------------------- |
| title       | string | Between 3 and 64 characters long |
|             |        | Contain at least one letter      |
| description | string | Not longer than 128 characters   |
| date        | string | Matches the pattern YYYY-mm-dd   |

#### Response

| Status Code | Content                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] }                                          |
| 200         | { _id: string, title: string, description: string, date: string, completed: boolean } |

### PATCH `/api/task/:id` (**Requires Auth**)

> Toggle task completion

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 200         | { _id: string, completed: boolean }          |

### DELETE `/api/task/:id` (**Requires Auth**)

> Delete a task

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 200         | { _id: string }                              |

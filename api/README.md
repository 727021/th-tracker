- [Task/Habit Tracker API Reference](#taskhabit-tracker-api-reference)
      - [Response](#response)
  - [Auth Endpoints](#auth-endpoints)
    - [Types](#types)
    - [POST `/api/auth/register`](#post-apiauthregister)
      - [Request Body](#request-body)
      - [Response](#response-1)
    - [POST `/api/auth/login`](#post-apiauthlogin)
      - [Request Body](#request-body-1)
      - [Response](#response-2)
    - [GET `/api/auth/user`](#get-apiauthuser)
      - [Response](#response-3)
  - [Task Endpoints](#task-endpoints)
    - [Types](#types-1)
    - [GET `/api/task`](#get-apitask)
      - [Request Query](#request-query)
      - [Response](#response-4)
    - [GET `/api/task/:id`](#get-apitaskid)
      - [Request Params](#request-params)
      - [Response](#response-5)
    - [POST `/api/task`](#post-apitask)
      - [Request Body](#request-body-2)
      - [Response](#response-6)
    - [PUT `/api/task/:id`](#put-apitaskid)
      - [Request Params](#request-params-1)
      - [Request Body](#request-body-3)
      - [Response](#response-7)
    - [PATCH `/api/task/:id`](#patch-apitaskid)
      - [Request Params](#request-params-2)
      - [Response](#response-8)
    - [DELETE `/api/task/:id`](#delete-apitaskid)
      - [Request Params](#request-params-3)
      - [Response](#response-9)
  - [Habit Endpoints](#habit-endpoints)
    - [Types](#types-2)
    - [GET `/api/habit`](#get-apihabit)
      - [Request Query](#request-query-1)
      - [Response](#response-10)
    - [GET `/api/habit/:id`](#get-apihabitid)
      - [Request Params](#request-params-4)
      - [Response](#response-11)

# Task/Habit Tracker API Reference

This file contains a description of each API endpoint used by the Task/Habit Tracker app. The API is broken into several parts: Auth, Task, and Habit. Each section starts with type definitions relevant to its endpoints.

All endpoints require authentication unless otherwise noted.

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

### Types

```typescript
type User = {
    _id: string
    username: string
    email: string
}
```

### POST `/api/auth/register`

> Create a new user account (No authentication required)

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

> Log into an existing user account (No authentication required)

#### Request Body

| Property | Type   | Requirements                        |
| -------- | ------ | ----------------------------------- |
| username | string | Valid username/password combination |
| password | string | Valid username/password combination |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 409         | { error: string }                            |
| 200         | { token: string, user: User }                |

### GET `/api/auth/user`

> Get the current logged in user

#### Response

| Status Code | Content           |
| ----------- | ----------------- |
| 404         | { error: string } |
| 200         | { user: User }    |

## Task Endpoints

### Types

```typescript
type Task = {
    _id: string
    title: string
    description: string
    date: string
    completed: boolean
}
```

### GET `/api/task`

> Get tasks within a date range

#### Request Query

| Property | Type   | Requirements                   |
| -------- | ------ | ------------------------------ |
| start    | string | Matches the pattern YYYY-mm-dd |
| end      | string | Matches the pattern YYYY-mm-dd |
|          |        | Cannot be before start         |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 200         | [ Task ]                                     |

### GET `/api/task/:id`

> Get a single task by its id

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 404         | {error: string}                              |
| 200         | Task                                         |

### POST `/api/task`

> Create a new task

#### Request Body

| Property    | Type   | Requirements                     |
| ----------- | ------ | -------------------------------- |
| title       | string | Between 3 and 64 characters long |
|             |        | Contain at least one letter      |
| description | string | Not longer than 128 characters   |
| date        | string | Matches the pattern YYYY-mm-dd   |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 201         | Task                                         |

### PUT `/api/task/:id`

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

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 200         | Task                                         |

### PATCH `/api/task/:id`

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

### DELETE `/api/task/:id`

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

## Habit Endpoints

### Types

```typescript
enum CompletionType {
    CHECK = 0,
    TEXT = 1,
    STARS = 2,
    NUMBER = 3
}

enum RepeatType {
    DAILY = 0,
    WEEKLY = 1,
    MONTHLY = 2,
    CUSTOM = 3
}

enum Day {
    SUN = 0,
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6
}

type Completion = {
    type: CompletionType
    days: {
        date: string
        dateCompare: number
        completion: boolean | number | string
    }[]
}

type Habit = {
    _id: string
    title: string
    description: string
    start: string
    end: string
    startCompare: number
    endCompare: number
    completion: Completion
    repeat: RepeatType
    days: Day[]
}
```

### GET `/api/habit`

> Get habits within a date range

#### Request Query

| Property | Type   | Requirements                   |
| -------- | ------ | ------------------------------ |
| start    | string | Matches the pattern YYYY-mm-dd |
| end      | string | Matches the pattern YYYY-mm-dd |
|          |        | Cannot be before start         |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 200         | [ Habit ]                                    |

### GET `/api/habit/:id`

> Get a single habit by id

#### Request Params

| Property | Type   | Requirements         |
| -------- | ------ | -------------------- |
| id       | string | Valid Mongo ObjectID |

#### Response

| Status Code | Content                                      |
| ----------- | -------------------------------------------- |
| 422         | { errors: [{ msg: string, param: string }] } |
| 404         | {error: string}                              |
| 200         | Habit                                        |


# Habit Tracker

A simple app for tracking habits and tasks, built with Nuxt, Express, MongoDB and TypeScript.

See it working at [https://th-tracker.herokuapp.com/](https://th-tracker.herokuapp.com/).

## Build Setup

The app requires a couple of environment variables be set in order to run.

Create a *.env* file with the following keys:

```
MONGODB_URL='<Your MongoDB connection URI>'
JWT_SECRET='<Your auth token secret>'
JWT_REFRESH_SECRET='<Your refresh token secret>'
API_ROOT='http://localhost:3000/api'
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

## TODO List

- [X] Fix DarkToggle bug
- [X] Replace fa icons with mdi icons
- [X] Task API
- [X] Task creation
- [X] Task list
- [X] Task editing
- [X] Task completion
- [X] Task deletion
- [X] Habit API
- [X] Habit creation
- [ ] Habit list
- [ ] Habit editing
- [ ] Habit deletion
- [ ] Habit tracking
- [ ] Calendar events from API
- [ ] Password resets
- [ ] Account confirmation
- [ ] Mobile layout
- [X] Rename Heroku app
- [ ] API docs on GitHub Pages

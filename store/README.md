# STORE

This file contains a description of the default application state, including vuex modules used in the application

## RootState

| Property    | Type                                     | Description                                                            |
| ----------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| selectedDay | `string`                                 | ISO date string representing the currently selected calendar day       |
| editTask    | `string | undefined`                     | `'new'` for a newly created task, or the id of the task being edited   |
| editHabit   | `string | undefined`                     | `'new'` for a newly created habit, or the id of the habit being edited |
| history     | `[{ selectedDay, editTask, editHabit }]` | A list of state snapshots used to revert to a previous state           |

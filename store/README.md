# STORE

This file contains a description of the vuex store used in this project.

## RootState

| Property    | Type      | Description                                                      |
| ----------- | --------- | ---------------------------------------------------------------- |
| selectedDay | `string`  | ISO date string representing the currently selected calendar day |
| tasks       | `Task[]`  | A list of tasks for the currently selected month                 |
| habits      | `Habit[]` | A list of habits for the currently selected month                |

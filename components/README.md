# COMPONENTS

This file contains a list of the components used in this application

- [COMPONENTS](#components)
  - [AuthButtons](#authbuttons)
  - [Calendar](#calendar)
  - [DarkToggle](#darktoggle)
    - [Props](#props)
    - [Slots](#slots)
  - [DatePickerModal](#datepickermodal)
    - [Props](#props-1)
  - [Footer](#footer)
  - [Habit](#habit)
    - [Props](#props-2)
  - [HabitList](#habitlist)
  - [Header](#header)
  - [Task](#task)
    - [Props](#props-3)
  - [TaskEditor](#taskeditor)
    - [Props](#props-4)
  - [TaskList](#tasklist)

## AuthButtons

> Navbar button for logging in/out

## Calendar

> Allows user to select a date and shows an overview of habits/tasks

## DarkToggle

> Toggles between light/dark mode

### Props

| Name            | Type                  | Description                                        |
| --------------- | --------------------- | -------------------------------------------------- |
| value (v-model) | `boolean | undefined` | true = dark, false = light                         |
| buttonTag       | `string`              | HTML tag to use instead of `button` (i.e. `v-btn`) |

### Slots

| Name  | Description                          |
| ----- | ------------------------------------ |
| dark  | Text/icon to show when in dark mode  |
| light | Text/icon to show when in light mode |


## DatePickerModal

> Date picker modal for forms

### Props

| Name            | Type                     | Description                                                                           |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------- |
| value (v-model) | `string`                 | ISO date string                                                                       |
| label           | `string`                 | Input label                                                                           |
| allowPast       | `boolean`                | Whether to allow selecting dates in the past                                          |
| clearable       | `boolean`                | Whether the input should be clearable                                                 |
| allowedDates    | `(d: string) => boolean` | Function accepting an ISO date string and returning whether that date can be selected |
| errorMessages   | `string[]`               | List of error messages to display                                                     |

## Footer

> Page footer containing copyright, [DarkToggle](#darktoggle), and a GitHub link

## Habit

> A list item for displaying and completing a single habit

### Props

| Name  | Type       | Description          |
| ----- | ---------- | -------------------- |
| habit | `APIHabit` | The habit to display |

## HabitList

> A list of [habits](#habit) displayed on the main page

## Header

> Page header containing [AuthButtons](#authbuttons) and an app title

## Task

> A list item for displaying and completing a single task

### Props

| Name | Type      | Description         |
| ---- | --------- | ------------------- |
| task | `APITask` | The task to display |

## TaskEditor

> An interface for creating and editing tasks

### Props

| Name | Type                 | Description                                            |
| ---- | -------------------- | ------------------------------------------------------ |
| id   | `string | undefined` | The id of the task to edit. Omit to create a new task. |

## TaskList

> A list of [tasks](#task) displayed on the main page

# COMPONENTS

This file contains a list of the components used in this application

- [COMPONENTS](#components)
  - [AuthButtons](#authbuttons)
  - [BackButton](#backbutton)
  - [Calendar](#calendar)
  - [DarkToggle](#darktoggle)
    - [Props](#props)
    - [Slots](#slots)
  - [DatePickerModal](#datepickermodal)
    - [Props](#props-1)
  - [EditHabit](#edithabit)
  - [EditTask](#edittask)
  - [Footer](#footer)
  - [HabitList](#habitlist)
  - [Header](#header)
  - [PlusButton](#plusbutton)
  - [TaskList](#tasklist)

## AuthButtons

> Navbar button for logging in/out

## BackButton

> Restores previous state when clicked

## Calendar

> Allows user to select a date and shows an overview of habits/tasks

## DarkToggle

> Toggles between light/dark mode

### Props

| Name            | Type                  | Description                                        |
| --------------- | --------------------- | -------------------------------------------------- |
| value (v-model) | `boolean | undefined` | true = dark, false = light                         |
| buttonTag       | `string`              | HTML tag to use instead of `button` (i.e. `v-btn`) |
| fontAwesome     | `string | undefined`  | Tag to use for fontAwesome icons (i.e. `fa-icon`)  |

### Slots

|       |                                      |
| ----- | ------------------------------------ |
| dark  | Text/icon to show when in dark mode  |
| light | Text/icon to show when in light mode |


## DatePickerModal

> Date picker modal for forms

### Props

|                 |                          |                                                                                       |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------- |
| value (v-model) | `string`                 | ISO date string                                                                       |
| label           | `string`                 | Input label                                                                           |
| allowPast       | `boolean`                | Whether to allow selecting dates in the past                                          |
| clearable       | `boolean`                | Whether the input should be clearable                                                 |
| allowedDates    | `(d: string) => boolean` | Function accepting an ISO date string and returning whether that date can be selected |

## EditHabit

> Screen for creating and editing habits

## EditTask

> Screen for creating and editing tasks

## Footer

> Page footer containing copyright, [DarkToggle](#darktoggle), and a GitHub link

## HabitList

> A list of habits displayed on the main page

## Header

> Page header containing [BackButton](#backbutton) and [AuthButtons](#authbuttons)

## PlusButton

> Floating action button for creating new habits and tasks

## TaskList

> A list of tasks displayed on the main page

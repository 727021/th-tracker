import { Document, ObjectId } from 'mongoose'

import { APIUser } from './user'

export interface IHabit {
    owner: ObjectId | APIUser
    title: string
    description: string
    start: string
    end: string
    startCompare: number
    endCompare: number
    completion: {
        type: Completion
        days: {
            date: string
            dateCompare: number
            completion: boolean | number | string
        }[]
    }
    repeat: Repeat
    days: Day[]
}
export interface IHabitDocument extends IHabit, Document {
    markComplete: (
        date: string,
        completion?: boolean | number | string
    ) => Promise<IHabitDocument>
}

export type APIHabit = Omit<IHabit, 'owner'> & Pick<IHabitDocument, '_id'>

export enum Completion {
    CHECK,
    TEXT,
    STARS,
    NUMBER
}

export const CompletionMap = new Map<
    Completion,
    { text: string; icon: string }
>([
    [
        Completion.CHECK,
        { text: 'Checkbox', icon: 'mdi-checkbox-marked-outline' }
    ],
    [Completion.TEXT, { text: 'Text', icon: 'mdi-form-textbox' }],
    [Completion.STARS, { text: 'Stars', icon: 'mdi-star-half-full' }],
    [Completion.NUMBER, { text: 'Number', icon: 'mdi-counter' }]
]) as ReadonlyMap<Completion, { text: string; icon: string }>

export enum Repeat {
    DAILY,
    WEEKLY,
    MONTHLY,
    CUSTOM
}

export const RepeatMap = new Map<Repeat, string>([
    [Repeat.DAILY, 'Daily'],
    [Repeat.WEEKLY, 'Weekly'],
    [Repeat.MONTHLY, 'Monthly'],
    [Repeat.CUSTOM, 'Custom']
]) as ReadonlyMap<Repeat, string>

export enum Day {
    SUN,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT
}

export const DayMap = new Map<Day, { short: string; long: string }>([
    [Day.SUN, { short: 'Sun', long: 'Sunday' }],
    [Day.MON, { short: 'Mon', long: 'Monday' }],
    [Day.TUE, { short: 'Tue', long: 'Tuesday' }],
    [Day.WED, { short: 'Wed', long: 'Wednesday' }],
    [Day.THU, { short: 'Thu', long: 'Thursday' }],
    [Day.FRI, { short: 'Fri', long: 'Friday' }],
    [Day.SAT, { short: 'Sat', long: 'Saturday' }]
]) as ReadonlyMap<Day, { short: string; long: string }>

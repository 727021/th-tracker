import { Document, Schema, model, ObjectId } from 'mongoose'

import dateToNumber from '../util/dateToNumber'

export const enum CompletionType {
    CHECK,
    TEXT,
    STARS,
    NUMBER
}

export const enum RepeatType {
    DAILY,
    WEEKLY,
    MONTHLY,
    CUSTOM
}

export const enum Day {
    SUN,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT
}

export type Completion = {
    type: CompletionType
    days: {
        date: string
        dateCompare: number
        completion: boolean | number | string
    }[]
}

export interface IHabit extends Document {
    owner: ObjectId
    title: string
    description: string
    start: string
    end: string
    startCompare: number
    endCompare: number
    completion: Completion
    repeat: RepeatType
    days: Day[]
    markComplete: (
        date: string,
        completion?: boolean | number | string
    ) => Promise<IHabit>
}

export const habitSchema = new Schema<IHabit>({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: false
    },
    startCompare: {
        type: Number,
        required: false
    },
    endCompare: {
        type: Number,
        required: false
    },
    completion: {
        type: {
            type: Number,
            required: true
        },
        days: [
            {
                date: {
                    type: String,
                    required: true
                },
                dateCompare: {
                    type: Number,
                    required: true
                },
                completion: {
                    type: Schema.Types.Mixed,
                    required: true
                }
            }
        ]
    },
    repeat: {
        type: Number,
        required: true
    },
    days: {
        type: [Number],
        required: false
    }
})

habitSchema.pre<IHabit>('save', function (next) {
    this.startCompare = dateToNumber(this.start)
    if (this.end) this.endCompare = dateToNumber(this.end)
    next()
})

/**
 * Edit whether a habit is completed for a given day.
 * @param date The date (YYYY-mm-dd) to mark as complete/incomplete.
 * @param completion The value to use when marking as complete. Omit this to mark as incomplete.
 */
habitSchema.methods.markComplete = async function (
    date: string,
    completion?: boolean | number | string
): Promise<IHabit> {
    const dateCompare = dateToNumber(date)

    if (completion === undefined) {
        // Mark as incomplete
        this.completion.days = this.completion.days.filter(
            d => d.dateCompare !== dateCompare
        )
    } else {
        // Do type conversion and throw errors if necessary
        switch (this.completion.type) {
            case CompletionType.CHECK:
                completion = !!completion
                break
            case CompletionType.NUMBER:
                completion = +completion
                if (isNaN(completion) || completion < 0)
                    throw new Error('Completion value must be a number > 0')
                break
            case CompletionType.STARS:
                completion = +completion
                if (isNaN(completion) || completion < 0 || completion > 5)
                    throw new Error('Completion value must be a number 0-5')
                break
            case CompletionType.TEXT:
                completion = '' + completion
                break
        }

        const d = {
            date,
            dateCompare,
            completion
        }

        this.completion.days.push(d)
    }

    return this.save()
}

export default model<IHabit>('Habit', habitSchema)

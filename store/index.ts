import { GetterTree, ActionTree, MutationTree } from 'vuex'
import monthDays from 'month-days'

import {
    COMPLETE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    NEW_HABIT,
    RESET_STATE,
    SET_DAY,
    SET_TASKS
} from '../@types/mutation-types'
import { REFRESH_MONTH, SELECT_DAY } from '../@types/action-types'
import { ITask } from '~/api/models/task'
import { GET_MONTH, GET_TASKS } from '~/@types/getter-types'

type Task = Pick<ITask, 'title' | 'description' | 'date' | 'completed'> & {
    _id: string
}

const initialState = (): RootState => ({
    selectedDay: new Date().toISOString().substring(0, 10),
    editHabit: undefined,
    tasks: []
})

export const state = initialState

export type RootState = {
    selectedDay: string
    editHabit?: string
    tasks: Task[]
}

export const getters: GetterTree<RootState, RootState> = {
    [GET_TASKS]: (s): Task[] => s.tasks.filter(t => t.date === s.selectedDay)
}

export const mutations: MutationTree<RootState> = {
    [SET_DAY]: (s, day: string) => {
        s.selectedDay = day
    },
    [NEW_HABIT]: s => {
        if (s.selectedDay === '') return
        s.editHabit = 'new'
    },
    [RESET_STATE]: s => {
        Object.assign(s, initialState())
    },
    [SET_TASKS]: (s, tasks: Task[]) => {
        s.tasks = tasks
    },
    [COMPLETE_TASK]: (
        s,
        { _id, completed }: Pick<Task, '_id' | 'completed'>
    ) => {
        s.tasks = s.tasks.map(t => (t._id === _id ? { ...t, completed } : t))
    },
    [DELETE_TASK]: (s, { _id }: Pick<Task, '_id'>) => {
        s.tasks = s.tasks.filter(t => t._id !== _id)
    },
    [CREATE_TASK]: (s, task: Task) => {
        s.tasks = [...s.tasks, task]
    },
    [EDIT_TASK]: (s, task: Task) => {
        s.tasks = s.tasks.map(t => (t._id === task._id ? task : t))
    }
}

export const actions: ActionTree<RootState, RootState> = {
    [SELECT_DAY]({ commit, dispatch, state: { selectedDay, tasks } }, day: string) {
        const [oldYear, oldMonth] = selectedDay.split('-').map(Number)
        const [newYear, newMonth] = day.split('-').map(Number)

        // Set selected day
        commit(SET_DAY, day)

        // Only refetch if we need to
        if (newYear !== oldYear || newMonth !== oldMonth || tasks.length === 0)
            // Update tasks/habits
            dispatch(REFRESH_MONTH)
    },
    async [REFRESH_MONTH]({ commit, state: { selectedDay } }) {
        try {
            // Fetch tasks
            const [year, month] = selectedDay.split('-').map(Number)
            const days = monthDays({ month, year })
            const start = `${year}-${month.toString().padStart(2, '0')}-01`
            const end = `${year}-${month.toString().padStart(2, '0')}-${days}`

            const tasks: Task[] = await this.$axios.$get<Task[]>(
                `/api/task?start=${start}&end=${end}`
            )
            commit(SET_TASKS, tasks)
            // Fetch habits
        } catch (err) {
            console.error(`Error loading tasks/habits for ${selectedDay}`)
            console.error(err)
        }
    }
}

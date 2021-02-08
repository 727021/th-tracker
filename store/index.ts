import { GetterTree, ActionTree, MutationTree } from 'vuex'

import {
    NEW_HABIT,
    RESET_STATE,
    SET_DAY as _SET_DAY,
    SET_TASKS
} from '../@types/mutation-types'
import { SET_DAY } from '../@types/action-types'
import { ITask } from '~/api/models/task'

type Task =
    | Pick<ITask, 'title' | 'description' | 'date' | 'completed'>
    | { _id: string }

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

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
    [_SET_DAY]: (s, day: string) => {
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
    }
}

export const actions: ActionTree<RootState, RootState> = {
    async [SET_DAY]({ commit }, day: string) {
        try {
            // Set selected day
            commit(_SET_DAY, day)
            // Fetch tasks
            const tasks: Task[] = await this.$axios.$get<Task[]>(
                `/api/task?start=${day}&end=${day}`
            )
            commit(SET_TASKS, tasks)
            // Fetch habits
        } catch (err) {
            console.error(`Error loading tasks/habits for ${day}`)
            console.error(err)
        }
    }
}

import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { CAN_GO_BACK } from '../@types/getter-types'
import {
    GO_BACK,
    NEW_HABIT,
    NEW_TASK,
    RESET_STATE,
    SET_DAY
} from '../@types/mutation-types'

const initialState = (): RootState => ({
    selectedDay: new Date().toISOString().substring(0, 10),
    editTask: undefined,
    editHabit: undefined,
    history: [],
    i: 0
})

export const state = initialState

type Snapshot = {
    selectedDay: string
    editTask?: string
    editHabit?: string
    i: number
}

export type RootState = {
    selectedDay: string
    editTask?: string
    editHabit?: string
    i: number
    history: Snapshot[]
}

export const getters: GetterTree<RootState, RootState> = {
    [CAN_GO_BACK]: s => s.history.length > 0
}

export const mutations: MutationTree<RootState> = {
    [GO_BACK]: s => {
        if (s.history.length > 0) {
            const prev = s.history.pop() as Snapshot

            s.selectedDay = prev?.selectedDay
            s.editTask = prev?.editTask
            s.editHabit = prev?.editHabit
            s.i = prev?.i || 0
        }
    },
    [SET_DAY]: (s, day: string) => {
        takeSnapshot(s)
        s.selectedDay = day
    },
    [NEW_TASK]: s => {
        if (s.selectedDay === '') return
        takeSnapshot(s)
        s.editTask = 'new'
    },
    [NEW_HABIT]: s => {
        if (s.selectedDay === '') return
        takeSnapshot(s)
        s.editHabit = 'new'
    },
    [RESET_STATE]: s => {
        Object.assign(s, initialState())
    }
}

const takeSnapshot = (s: RootState) => {
    s.history.push({
        selectedDay: s.selectedDay,
        editTask: s.editTask,
        editHabit: s.editHabit,
        i: s.i
    })
}

export const actions: ActionTree<RootState, RootState> = {}

import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { CAN_GO_BACK } from '../@types/getter-types'
import { GO_BACK, SET_DAY } from '../@types/mutation-types'

export const state = (): RootState => ({
    selectedDay: new Date().toISOString().substring(0, 10),
    editTodo: undefined,
    editHabit: undefined,
    history: [],
    i: 0
})

type Snapshot = {
    selectedDay: string
    editTodo?: string
    editHabit?: string
    i: number
}

export type RootState = {
    selectedDay: string
    editTodo?: string
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
            s.editTodo = prev?.editTodo
            s.editHabit = prev?.editHabit
            s.i = prev?.i || 0
        }
    },
    [SET_DAY]: (s, day: string) => {
        takeSnapshot(s)
        s.selectedDay = day
    }
}

const takeSnapshot = (s: RootState) => {
    s.history.push({
        selectedDay: s.selectedDay,
        editTodo: s.editTodo,
        editHabit: s.editHabit,
        i: s.i
    })
}

export const actions: ActionTree<RootState, RootState> = {}

import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { CAN_GO_BACK } from './getter-types'
import { GO_BACK, GO_FORWARD } from './mutation-types'

export const state = (): RootState => ({
    selectedDay: undefined,
    editTodo: undefined,
    editHabit: undefined,
    history: [],
    i: 0
})

type Snapshot = {
    selectedDay?: Date
    editTodo?: string
    editHabit?: string
    i: number
}

export type RootState = {
    selectedDay?: Date
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
    [GO_FORWARD]: s => {
        s.history.push({
            selectedDay: s.selectedDay,
            editTodo: s.editTodo,
            editHabit: s.editHabit,
            i: s.i
        })
        s.i++
    }
}

export const actions: ActionTree<RootState, RootState> = {}

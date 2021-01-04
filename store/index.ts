import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    selectedDay: null,
    editTodo: null,
    editHabit: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}

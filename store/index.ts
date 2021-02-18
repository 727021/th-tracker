import { GetterTree, ActionTree, MutationTree } from 'vuex'
import monthDays from 'month-days'

import {
    COMPLETE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    RESET_STATE,
    SET_DAY,
    SET_TASKS,
    SET_HABITS,
    COMPLETE_HABIT,
    CREATE_HABIT,
    DELETE_HABIT,
    EDIT_HABIT,
    END_HABIT
} from '~/@types/mutation-types'
import { REFRESH_MONTH, SELECT_DAY } from '~/@types/action-types'
import type { APITask } from '~/@types/task'
import { Day, Repeat } from '~/@types/habit'
import type { APIHabit } from '~/@types/habit'
import { GET_HABITS, GET_MONTH, GET_TASKS } from '~/@types/getter-types'
import dateToNumber from '~/api/util/dateToNumber'
import { Context } from '@nuxt/types'
import { RefreshScheme, RefreshSchemeOptions } from '@nuxtjs/auth-next'
import { APIUser } from '~/@types/user'
import { StatusCodes } from 'http-status-codes'

const initialState = (): RootState => ({
    selectedDay: new Date().toISOString().substring(0, 10),
    tasks: [],
    habits: []
})

export const state = initialState

export type RootState = {
    selectedDay: string
    tasks: APITask[]
    habits: APIHabit[]
}

export const getters: GetterTree<RootState, RootState> = {
    [GET_TASKS]: (s): APITask[] =>
        s.tasks.filter(t => t.date === s.selectedDay),
    [GET_HABITS]: (s): APIHabit[] => {
        const today: number = dateToNumber(s.selectedDay)
        const dayOfWeek: Day = new Date(s.selectedDay).getDay()
        const dayOfMonth = +s.selectedDay.split('-')[2]

        return s.habits.filter(h => {
            if (h.endCompare && h.endCompare < today) return false
            if (h.startCompare > today) return false
            if (
                h.repeat === Repeat.WEEKLY &&
                dayOfWeek !== (new Date(h.start).getDay() as Day)
            )
                return false
            if (
                h.repeat === Repeat.MONTHLY &&
                dayOfMonth !== +h.start.split('-')[2]
            )
                return false
            if (h.repeat === Repeat.CUSTOM && !h.days.includes(dayOfWeek))
                return false

            return true
        })
    }
}

export const mutations: MutationTree<RootState> = {
    [SET_DAY]: (s, day: string) => {
        s.selectedDay = day
    },
    [RESET_STATE]: s => {
        Object.assign(s, initialState())
    },
    [SET_TASKS]: (s, tasks: APITask[]) => {
        s.tasks = tasks
    },
    [COMPLETE_TASK]: (
        s,
        { _id, completed }: Pick<APITask, '_id' | 'completed'>
    ) => {
        s.tasks = s.tasks.map(t => (t._id === _id ? { ...t, completed } : t))
    },
    [DELETE_TASK]: (s, { _id }: Pick<APITask, '_id'>) => {
        s.tasks = s.tasks.filter(t => t._id !== _id)
    },
    [CREATE_TASK]: (s, task: APITask) => {
        s.tasks = [...s.tasks, task]
    },
    [EDIT_TASK]: (s, task: APITask) => {
        s.tasks = s.tasks.map(t => (t._id === task._id ? task : t))
    },
    [SET_HABITS]: (s, habits: APIHabit[]) => {
        s.habits = habits
    },
    [COMPLETE_HABIT]: (
        s,
        { _id, completion }: Pick<APIHabit, '_id' | 'completion'>
    ) => {
        s.habits = s.habits.map(h => (h._id === _id ? { ...h, completion } : h))
    },
    [DELETE_HABIT]: (s, { _id }: Pick<APIHabit, '_id'>) => {
        s.habits = s.habits.filter(h => h._id !== _id)
    },
    [CREATE_HABIT]: (s, habit: APIHabit) => {
        s.habits = [...s.habits, habit]
    },
    [EDIT_HABIT]: (s, habit: APIHabit) => {
        s.habits = s.habits.map(h => (h._id === habit._id ? habit : h))
    },
    [END_HABIT]: (s, habit: Pick<APIHabit, '_id' | 'end' | 'endCompare'>) => {
        s.habits = s.habits.map(h =>
            h._id === habit._id
                ? { ...h, end: habit.end, endCompare: habit.endCompare }
                : h
        )
    }
}

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ dispatch }, { req }: Context) {
        if (req.headers.cookie) {
            const cookieObj: { [key: string]: string } = {}
            req.headers.cookie.split('; ').forEach(c => {
                try {
                    const [k, v] = c.split('=')
                    cookieObj[k.trim()] = unescape(v).trim()
                } catch (e) {}
            })

            const strat = this.$auth.getStrategy() as RefreshScheme

            const access_token = cookieObj['auth._token.local']
            const refresh_token = cookieObj['auth._refresh_token.local']

            if (Boolean(access_token) && Boolean(refresh_token)) {
                strat.token.set(access_token)
                strat.refreshToken.set(refresh_token)
                await dispatch('fetchUser', { access_token, refresh_token })
            }
        }
    },
    async fetchUser(
        _,
        {
            access_token,
            refresh_token
        }: { access_token: string; refresh_token: string }
    ) {
        try {
            const { user } = await this.$axios.$get(
                `${process.env.API_ROOT}/auth/user`,
                {
                    headers: {
                        Authorization: access_token
                    }
                }
            )

            this.$auth.setUser(user)
        } catch (err) {
            if (err.response.data.status === StatusCodes.UNAUTHORIZED) {
                const tokens = await this.$axios.$post(
                    `${process.env.API_ROOT}/auth/refresh`,
                    { refresh_token },
                    {
                        headers: {
                            Authorization: access_token
                        }
                    }
                )
                const strat = this.$auth.getStrategy() as RefreshScheme
                if (
                    Boolean(tokens.access_token) &&
                    Boolean(tokens.refresh_token)
                ) {
                    strat.token.set(tokens.access_token)
                    strat.refreshToken.set(tokens.refresh_token)
                    try {
                        const { user } = await this.$axios.$get(
                            `${process.env.API_ROOT}/auth/user`,
                            {
                                headers: {
                                    Authorization: tokens.access_token
                                }
                            }
                        )

                        this.$auth.setUser(user)
                    } catch (err) {}
                }
            }
        }
    },
    [SELECT_DAY](
        { commit, dispatch, state: { selectedDay, tasks, habits } },
        day: string
    ) {
        const [oldYear, oldMonth] = selectedDay.split('-').map(Number)
        const [newYear, newMonth] = day.split('-').map(Number)

        // Set selected day
        commit(SET_DAY, day)

        // Only refetch if we need to
        if (
            newYear !== oldYear ||
            newMonth !== oldMonth ||
            tasks.length === 0 ||
            habits.length === 0
        )
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

            const tasks: APITask[] = await this.$axios.$get<APITask[]>(
                `/api/task?start=${start}&end=${end}`
            )
            commit(SET_TASKS, tasks)

            // Fetch habits
            const habits: APIHabit[] = await this.$axios.$get<APIHabit[]>(
                `/api/habit?start=${start}&end=${end}`
            )
            commit(SET_HABITS, habits)
        } catch (err) {
            console.error(`Error loading tasks/habits for ${selectedDay}`)
            console.error(err)
        }
    }
}

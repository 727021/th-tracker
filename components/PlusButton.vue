<template>
    <v-speed-dial
        transition="slide-y-transition"
        top
        right
        direction="bottom"
        v-model="fab"
        absolute
    >
        <template #activator>
            <v-btn dark fab color="success" v-model="fab">
                <fa-icon size="lg" :icon="fab ? 'times' : 'plus'" />
            </v-btn>
        </template>
        <v-tooltip left>
            <template #activator="{ on, attrs }">
                <v-btn
                    dark
                    fab
                    color="warning"
                    v-bind="attrs"
                    v-on="on"
                    @click="newTask"
                >
                    <fa-icon size="lg" icon="tasks" />
                </v-btn>
            </template>
            <span>New Task</span>
        </v-tooltip>
        <v-tooltip left>
            <template #activator="{ on, attrs }">
                <v-btn
                    dark
                    fab
                    color="purple"
                    v-bind="attrs"
                    v-on="on"
                    @click="newHabit"
                >
                    <fa-icon size="lg" :icon="['far', 'calendar-alt']" />
                </v-btn>
            </template>
            <span>New Habit</span>
        </v-tooltip>
    </v-speed-dial>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { NEW_TASK, NEW_HABIT } from '@/@types/mutation-types'

export default Vue.extend({
    name: 'PlusButton',
    data: () => {
        let fab: boolean = false

        return {
            fab
        }
    },
    methods: {
        ...mapMutations({
            newTask: NEW_TASK,
            newHabit: NEW_HABIT
        })
    }
})
</script>
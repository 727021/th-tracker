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
                <v-icon large>mdi-{{fab ? 'close' : 'plus'}}</v-icon>
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
                    <v-icon large>mdi-format-list-checkbox</v-icon>
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
                    <v-icon large>mdi-calendar-month</v-icon>
                </v-btn>
            </template>
            <span>New Habit</span>
        </v-tooltip>
    </v-speed-dial>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { NEW_HABIT, NEW_TASK } from '~/@types/mutation-types'

@Component
export default class PlusButton extends Vue {
    fab: boolean = false

    @Mutation(NEW_TASK) newTask!: any
    @Mutation(NEW_HABIT) newHabit!: any
}
</script>
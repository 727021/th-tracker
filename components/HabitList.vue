<template>
    <v-card color="purple pa-1">
        <v-card-title class="white--text text-h4">
            <v-icon large dark>mdi-calendar-month</v-icon>
            Habits
            <v-spacer></v-spacer>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <transition name="grow">
                        <v-btn
                            dark
                            fab
                            small
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                            to="/habit"
                            v-if="showPlus"
                        >
                            <v-icon large>mdi-plus</v-icon>
                        </v-btn>
                    </transition>
                </template>
                <span>New Habit</span>
            </v-tooltip>
        </v-card-title>

        <v-card-subtitle>(Double click to edit)</v-card-subtitle>

        <v-list v-if="getHabits.length > 0" three-line>
            <template v-for="(item, index) in getHabits">
                <v-divider v-if="index > 0" :key="`d${index}`"></v-divider>
                <Habit :habit="item" :key="index" />
            </template>
        </v-list>
        <v-list v-else three-line>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-center">
                        No Habits
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-center">
                        Looks like you don't have any habits for today.
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { GET_HABITS } from '~/@types/getter-types'
import { APIHabit } from '~/@types/habit'
import dateToNumber from '~/api/util/dateToNumber'

@Component
export default class HabitList extends Vue {
    @Getter(GET_HABITS) getHabits!: APIHabit[]

    get showPlus(): boolean {
        return (
            dateToNumber(this.$store.state.selectedDay) >=
            dateToNumber(new Date().toISOString().substring(0, 10))
        )
    }
}
</script>
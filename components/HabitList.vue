<template>
    <v-card color="purple pa-1">
        <v-card-title class="white--text text-h4">
            <v-icon large dark>mdi-calendar-month</v-icon>
            Habits
            <v-spacer></v-spacer>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        dark
                        fab
                        small
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                        @click="newHabit"
                    >
                        <v-icon large>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>New Habit</span>
            </v-tooltip>
        </v-card-title>

        <div v-if="loading">
            <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
            <v-skeleton-loader
                type="list-item-two-line"
                class="mt-1"
            ></v-skeleton-loader>
            <v-skeleton-loader
                type="list-item-two-line"
                class="mt-1"
            ></v-skeleton-loader>
            <v-skeleton-loader
                type="list-item-two-line"
                class="mt-1"
            ></v-skeleton-loader>
            <v-skeleton-loader
                type="list-item-two-line"
                class="mt-1"
            ></v-skeleton-loader>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { NEW_HABIT } from '~/@types/mutation-types'

@Component
export default class HabitList extends Vue {
    loading: boolean = true

    @Mutation(NEW_HABIT) newHabit!: any
}
</script>
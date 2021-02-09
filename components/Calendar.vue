<template>
    <div class="d-inline-block primary rounded pa-1">
        <v-date-picker
            show-adjacent-months
            v-model="selectedDay"
            color="primary"
            :events="events"
            full-width
            year-icon="mdi-calendar"
        ></v-date-picker>
        <v-divider class="white my-1"></v-divider>
        <div class="d-flex align-baseline justify-space-around">
            <v-chip dark small color="purple">Habit</v-chip>
            <v-chip dark small color="warning">Task</v-chip>
            <v-chip dark small color="error">Late</v-chip>
            <v-chip dark small color="success">Completed</v-chip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SELECT_DAY } from '~/@types/action-types'

type calendarEvent = boolean | string | string[]

@Component
export default class Calendar extends Vue {
    get selectedDay(): string {
        return this.$store.state.selectedDay
    }

    set selectedDay(d: string) {
        this.$store.dispatch(SELECT_DAY, d)
    }

    events(d: string): calendarEvent {
        const events: { [key: string]: calendarEvent } = {
            '2021-01-15': 'success',
            '2021-01-23': 'warning',
            '2021-01-11': ['error', 'purple']
        }

        return events[d]
    }
}
</script>
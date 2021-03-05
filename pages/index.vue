<template>
    <v-container class="my-1">
        <v-row>
            <v-col cols="4">
                <Calendar />
            </v-col>
            <v-col cols="4">
                <TaskList />
            </v-col>
            <v-col cols="4">
                <HabitList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SELECT_DAY } from '~/@types/action-types'

@Component({ head: { title: 'Home' }, transition: 'slide-right' })
export default class Index extends Vue {
    mounted() {
        // Set the selected day to do an initial load of tasks/habits
        this.$store.dispatch(SELECT_DAY, this.$store.state.selectedDay)
    }
}
</script>

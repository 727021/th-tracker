<template>
    <EditTask v-if="$store.state.editTask" />
    <EditHabit v-else-if="$store.state.editHabit" />
    <div v-else>
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
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SET_DAY } from '~/@types/action-types'

@Component({ head: { title: 'Home' }, transition: 'slide-right' })
export default class Index extends Vue {
    mounted() {
        this.$store.dispatch(SET_DAY, this.$store.state.selectedDay)
    }
}
</script>

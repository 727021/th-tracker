<template>
    <v-card color="warning pa-1">
        <v-card-title class="white--text text-h4">
            <v-icon large dark>mdi-format-list-checkbox</v-icon>
            Tasks
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
                            to="/task"
                            v-if="showPlus"
                        >
                            <v-icon large>mdi-plus</v-icon>
                        </v-btn>
                    </transition>
                </template>
                <span>New Task</span>
            </v-tooltip>
        </v-card-title>

        <v-card-subtitle>(Double click to edit)</v-card-subtitle>

        <v-list v-if="getTasks.length > 0" three-line>
            <template v-for="(item, index) in getTasks">
                <v-divider v-if="index > 0" :key="`d${index}`"></v-divider>
                <Task :task="item" :key="index" />
            </template>
        </v-list>
        <v-list v-else three-line>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-center">
                        No Tasks
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-center">
                        Looks like you don't have any tasks for today.
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { GET_TASKS } from '~/@types/getter-types'
import { ITask } from '~/api/models/task'

type APITask = Pick<ITask, 'title' | 'description' | 'date' | 'completed'> & {
    _id: string
}

@Component
export default class TaskList extends Vue {
    @Getter(GET_TASKS) getTasks!: APITask[]

    get showPlus(): boolean {
        const [year, month, day] = new Date()
            .toISOString()
            .substring(0, 10)
            .split('-')
            .map(Number)
        const [y, m, d] = this.$store.state.selectedDay.split('-').map(Number)
        console.log([year, month, day])
        console.log([y, m, d])
        return y >= year && m >= month && d >= day
    }
}
</script>

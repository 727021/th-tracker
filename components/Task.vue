<template>
    <v-list-item>
        <v-list-item-content
            class="pointer noselect"
            @dblclick.prevent="editTask()"
        >
            <v-list-item-title
                :class="{
                    'text-decoration-line-through text--disabled':
                        task.completed
                }"
            >
                {{ task.title }}
            </v-list-item-title>
            <v-list-item-subtitle
                v-if="task.description"
                :class="{
                    'text-decoration-line-through text--disabled':
                        task.completed
                }"
            >
                {{ task.description }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        small
                        icon
                        @click="deleteTask"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="loading"
                    >
                        <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        small
                        icon
                        @click="toggleCompleted"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="loading"
                    >
                        <v-icon small>
                            {{
                                task.completed
                                    ? 'mdi-checkbox-marked-outline'
                                    : 'mdi-checkbox-blank-outline'
                            }}
                        </v-icon>
                    </v-btn>
                </template>
                <span>
                    Mark
                    {{ task.completed ? 'Incomplete' : 'Completed' }}
                </span>
            </v-tooltip>
        </v-list-item-action>
    </v-list-item>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

import type { APITask, CompletedTask, DeletedTask } from '~/@types/task'
import { COMPLETE_TASK, DELETE_TASK } from '~/@types/mutation-types'

@Component
export default class Task extends Vue {
    @Prop({ required: true }) readonly task!: APITask

    loading: boolean = false

    editTask() {
        this.$router.push(`/task/${this.task._id}`)
    }

    async toggleCompleted() {
        try {
            this.loading = true
            const task: CompletedTask = await this.$axios.$patch<CompletedTask>(
                `/api/task/${this.task._id}`
            )
            this.$store.commit(COMPLETE_TASK, task)
        } finally {
            this.loading = false
        }
    }

    async deleteTask() {
        try {
            this.loading = true
            const task: DeletedTask = await this.$axios.$delete<DeletedTask>(
                `/api/task/${this.task._id}`
            )
            this.$store.commit(DELETE_TASK, task)
        } finally {
            this.loading = false
        }
    }
}
</script>
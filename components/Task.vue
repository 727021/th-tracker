<template>
    <v-list-item :key="index">
        <v-list-item-content
            class="pointer noselect"
            @dblclick.prevent="editTask(task._id)"
        >
            <v-list-item-title
                :class="{
                    'text-decoration-line-through': task.completed
                }"
            >
                {{ task.title }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="task.description">
                {{ task.description }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        small
                        icon
                        @click="deleteTask(task._id)"
                        v-bind="attrs"
                        v-on="on"
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
                        @click="toggleCompleted(task._id)"
                        v-bind="attrs"
                        v-on="on"
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

import { ITask } from '~/api/models/task'

type APITask =
    | Pick<ITask, 'title' | 'description' | 'date' | 'completed'>
    | { _id: string }

@Component
export default class Task extends Vue {
    @Prop({ required: true }) readonly task!: APITask

    editTask(id: string) {
        this.$router.push(`/task/${id}`)
    }

    deleteTask(id: string) {
        //
    }

    toggleCompleted(id: string) {
        //
    }
}
</script>
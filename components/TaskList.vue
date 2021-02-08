<template>
    <v-card color="warning pa-1">
        <v-card-title class="white--text text-h4">
            <v-icon large dark>mdi-format-list-checkbox</v-icon>
            Tasks
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
                        to="/task"
                    >
                        <v-icon large>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>New Task</span>
            </v-tooltip>
        </v-card-title>

        <v-card-subtitle>(Double click to edit)</v-card-subtitle>

        <v-list v-if="$store.state.tasks.length > 0" three-line>
            <template v-for="(item, index) in $store.state.tasks">
                <v-divider v-if="index > 0" :key="index"></v-divider>
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

@Component
export default class TaskList extends Vue {}
</script>
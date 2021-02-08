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

@Component
export default class TaskList extends Vue {
    loading: boolean = true
}
</script>
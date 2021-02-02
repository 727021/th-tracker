<template>
    <v-card color="warning pa-1">
        <v-card-title class="white--text text-h4">
            Tasks
            <v-spacer></v-spacer>
            <v-icon large>mdi-format-list-checkbox</v-icon>
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
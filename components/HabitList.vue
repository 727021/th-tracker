<template>
    <v-card color="purple pa-1">
        <v-card-title class="white--text">Habits</v-card-title>

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
import Vue from 'vue'
export default Vue.extend({
    name: 'HabitList',
    data: () => {
        const loading: boolean = true

        return {
            loading
        }
    }
})
</script>
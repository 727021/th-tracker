<template>
    <v-container class="my-1">
        <v-card
            color="warning"
            :width="$device.isMobile ? '' : '50%'"
            class="mx-auto pa-1"
        >
            <v-card-title class="white--text">
                {{ isNew ? 'New' : 'Edit' }} Task
            </v-card-title>
            <v-card class="pa-1">
                <form @submit.prevent>
                    <DatePickerModal
                        label="Task Date"
                        v-model="date"
                        clearable
                    />
                    <v-text-field
                        v-model="title"
                        prepend-icon="mdi-format-title"
                        label="Task Title"
                        counter="64"
                        maxlength="64"
                        clearable
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        label="Task Description"
                        prepend-icon="mdi-comment"
                        auto-grow
                        counter="128"
                        maxlength="128"
                        clearable
                    ></v-textarea>
                </form>
            </v-card>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'EditTask',
    data() {
        let date: string = this.$store.state.selectedDay
        let title: string = ''
        let description: string = ''

        return {
            date,
            title,
            description
        }
    },
    computed: {
        isNew(): boolean {
            return this.$store.state.editTask === 'new'
        }
    }
})
</script>
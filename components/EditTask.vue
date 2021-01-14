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
                <form @submit.prevent="save">
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
                    <v-divider></v-divider>
                    <DatePickerModal
                        label="Task Date"
                        v-model="date"
                        clearable
                    />
                    <v-divider></v-divider>
                    <div class="d-flex align-center justify-center">
                        <v-btn text color="error" small @click="goBack">
                            Cancel
                        </v-btn>
                        <v-btn text color="success" type="submit">Save</v-btn>
                    </div>
                </form>
            </v-card>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { GO_BACK } from '@/@types/mutation-types'

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
    },
    methods: {
        ...mapMutations({
            goBack: GO_BACK
        }),
        save() {
            console.log('save')
        }
    }
})
</script>
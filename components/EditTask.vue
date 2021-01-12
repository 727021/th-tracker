<template>
    <v-container class="my-1">
        <v-card
            color="warning"
            :width="$device.isMobile ? '' : '50%'"
            class="mx-auto pa-1"
            dark
        >
            <v-card-title> {{ isNew ? 'New' : 'Edit' }} Task </v-card-title>

            <form @submit.prevent>
                <!-- TODO Make this date-picker dialog combo its own reusable component -->
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    :width="$device.isMobile ? '' : '30%'"
                >
                    <template #activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Task Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </form>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'EditTask',
    data() {
        let date: string = this.$store.state.selectedDay
        let modal: boolean = false

        return {
            date,
            modal
        }
    },
    computed: {
        isNew(): boolean {
            return this.$store.state.editTask === 'new'
        }
    }
})
</script>
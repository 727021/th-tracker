<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        :width="$device.isMobile ? '' : '30%'"
    >
        <template #activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                :label="label"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :clearable="clearable"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="date"
            scrollable
            :min="new Date().toISOString().substring(0, 10)"
            :allowed-dates="allowedDates"
        >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="OK">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'DatePickerModal',
    props: {
        value: String,
        label: String,
        allowPast: Boolean,
        clearable: Boolean,
        allowedDates: Function
    },
    data() {
        let modal: boolean = false
        let date: string = this.value

        return {
            modal,
            date
        }
    },
    methods: {
        OK() {
            this.$refs['dialog'].save(this.date)
            this.$emit('input', this.date)
        }
    }
})
</script>
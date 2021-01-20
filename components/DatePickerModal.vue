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
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DatePickerModal extends Vue {
    @Prop() readonly value!: string
    @Prop() readonly label!: string
    @Prop() readonly allowPast!: boolean
    @Prop() readonly clearable!: boolean
    @Prop() readonly allowedDates!: (d: string) => boolean

    modal: boolean = false
    date: string = this.value

    $refs!: {
        // This fix feels hacky. Need to find something better.
        dialog: any
    }

    OK() {
        this.$refs.dialog.save(this.date)
        this.$emit('input', this.date)
    }
}
</script>
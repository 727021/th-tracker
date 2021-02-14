<template>
    <v-container class="my-1">
        <v-card
            color="purple"
            :width="$device.isMobile ? '' : '50%'"
            class="mx-auto pa-1"
        >
            <v-card-title class="white--text">
                {{ isNew ? 'New' : 'Edit' }} Habit
            </v-card-title>
            <v-card class="pa-1">
                <form @submit.prevent="save">
                    <v-text-field
                        v-model="title"
                        prepend-icon="mdi-format-title"
                        label="Habit Title"
                        counter="64"
                        maxlength="64"
                        clearable
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        label="Habit Description"
                        prepend-icon="mdi-comment"
                        auto-grow
                        counter="128"
                        maxlength="128"
                        clearable
                    ></v-textarea>
                    <v-divider></v-divider>
                    <DatePickerModal label="Start Date" v-model="startDate" />
                    <DatePickerModal
                        label="End Date"
                        v-model="endDate"
                        clearable
                        :allowed-dates="allowedDates"
                        ref="endDate"
                    />
                    <v-select
                        label="Repeat"
                        :items="['Daily', 'Weekly', 'Monthly', 'Custom']"
                        v-model="repeat"
                        prepend-icon="mdi-repeat"
                        @change="days = []"
                    >
                    </v-select>
                    <div class="d-flex justify-center mb-2">
                        <v-chip-group
                            v-model="days"
                            multiple
                            v-if="repeat === 'Custom'"
                        >
                            <v-chip
                                v-for="(day, i) of dayList"
                                :key="i"
                                :color="days.includes(i) ? 'purple' : ''"
                                :class="{ 'white--text': days.includes(i) }"
                            >
                                {{ day }}
                            </v-chip>
                        </v-chip-group>
                    </div>
                    <v-divider></v-divider>
                    <v-select
                        label="Completion"
                        :items="['Checkbox', 'Text', 'Stars', 'Number']"
                        v-model="completion"
                        :prepend-icon="completionIcon"
                    ></v-select>
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
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class EditHabit extends Vue {
    startDate: string = this.$store.state.selectedDay
    endDate: string = ''
    title: string = ''
    description: string = ''
    repeat: string = 'Daily'
    days: any[] = []
    readonly dayList: string[] = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]
    completion: string = 'Checkbox'

    get isNew(): boolean {
        return this.$store.state.editHabit === 'new'
    }

    get completionIcon(): string {
        switch (this.completion) {
            case 'Text':
                return 'mdi-form-textbox'
            case 'Stars':
                return 'mdi-star-half-full'
            case 'Number':
                return 'mdi-counter'
            default:
                return 'mdi-checkbox-marked-outline'
        }
    }

    goBack() {
        this.$router.push('/')
    }

    save() {
        console.log('save')
    }

    allowedDates(d: string): boolean {
        return new Date(d) >= new Date(this.startDate)
    }
}
</script>
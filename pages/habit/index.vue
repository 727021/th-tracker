<template>
    <v-container class="my-1">
        <v-card
            color="purple"
            :width="$device.isMobile ? '' : '50%'"
            class="mx-auto pa-1"
        >
            <v-card-title>New Habit</v-card-title>
            <v-card class="pa-1">
                <form @submit.prevent="save">
                    <v-text-field
                        v-model="title.value"
                        prepend-icon="mdi-format-title"
                        label="Habit Title"
                        counter="64"
                        maxlength="64"
                        clearable
                        :error-messages="error(title)"
                    ></v-text-field>
                    <v-textarea
                        v-model="description.value"
                        label="Habit Description"
                        prepend-icon="mdi-comment"
                        auto-grow
                        counter="128"
                        maxlength="128"
                        clearable
                        :error-messages="error(description)"
                    ></v-textarea>
                    <v-divider></v-divider>
                    <DatePickerModal
                        label="Start Date"
                        v-model="start.value"
                        :error-messages="error(start)"
                    />
                    <v-select
                        label="Repeat"
                        :items="repeatItems"
                        v-model="repeat.value"
                        prepend-icon="mdi-repeat"
                        @change="days = []"
                        :error-messages="error(repeat)"
                    ></v-select>
                    <div class="d-flex justify-center mb-2">
                        <v-chip-group
                            v-model="days.value"
                            multiple
                            v-if="showDays"
                        >
                            <v-chip
                                v-for="{ text, value } of dayItems"
                                :key="value"
                                :color="days.includes(value) ? 'purple' : ''"
                                :class="{ 'white--text': days.includes(value) }"
                            >
                                {{ text }}
                            </v-chip>
                        </v-chip-group>
                    </div>
                    <v-divider></v-divider>
                    <v-select
                        label="Completion"
                        v-model="completion.value"
                        :items="completionItems"
                        :prepend-icon="completionIcon"
                        :error-messages="error(completion)"
                    ></v-select>
                    <v-divider></v-divider>
                    <div class="d-flex align-center justify-center">
                        <v-btn text color="error" small to="/">Cancel</v-btn>
                        <v-btn text color="success" type="submit">Save</v-btn>
                    </div>
                </form>
            </v-card>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StatusCodes } from 'http-status-codes'

import {
    Completion,
    CompletionMap,
    Repeat,
    RepeatMap,
    Day,
    DayMap
} from '~/@types/habit'
import type { APIHabit } from '~/@types/habit'
import { CREATE_HABIT } from '~/@types/mutation-types'

type input<T> = {
    value: T
    error: string
}

@Component({ head: { title: 'New Habit' }, transition: 'slide-left' })
export default class NewHabit extends Vue {
    title: input<string> = {
        value: '',
        error: ''
    }
    description: input<string> = {
        value: '',
        error: ''
    }
    start: input<string> = {
        value: this.$store.state.selectedDay,
        error: ''
    }
    completion: input<Completion> = {
        value: Completion.CHECK,
        error: ''
    }
    repeat: input<Repeat> = {
        value: Repeat.DAILY,
        error: ''
    }
    days: input<Day[]> = {
        value: [],
        error: ''
    }

    async save() {
        try {
            const habit: APIHabit = await this.$axios.$post<APIHabit>(
                '/api/habit',
                {
                    title: this.title.value,
                    description: this.description.value,
                    start: this.start.value,
                    completion: this.completion.value,
                    repeat: this.repeat.value,
                    days:
                        this.days.value.length === 0
                            ? undefined
                            : this.days.value
                }
            )

            this.$store.commit(CREATE_HABIT, habit)

            this.$router.push('/')
        } catch (err) {
            if (err.response.status !== StatusCodes.UNPROCESSABLE_ENTITY)
                return this.$nuxt.error({
                    message: err.message ?? err.response?.data?.error,
                    statusCode: err.response?.status
                })

            for (const { param, msg } of err.response.data.errors) {
                if (this.hasOwnProperty(param)) {
                    switch (param) {
                        case 'title':
                            this.title.error = msg
                            break
                        case 'description':
                            this.description.error = msg
                            break
                        case 'start':
                            this.start.error = msg
                            break
                        case 'completion':
                            this.completion.error = msg
                            break
                        case 'repeat':
                            this.repeat.error = msg
                            break
                        case 'days':
                            this.days.error = msg
                            break
                    }
                }
            }
        }
    }

    get repeatItems(): { text: string; value: Repeat }[] {
        const out: { text: string; value: Repeat }[] = []

        for (const [k, v] of RepeatMap.entries())
            out.push({ text: v, value: k })

        return out
    }

    get showDays(): boolean {
        return this.repeat.value === Repeat.CUSTOM
    }

    get dayItems(): { text: string; value: Day }[] {
        const out: { text: string; value: Day }[] = []

        for (const [k, v] of DayMap.entries())
            out.push({ text: v.short, value: k })

        return out
    }

    get completionItems(): { text: string; value: Completion }[] {
        const out: { text: string; value: Completion }[] = []

        for (const [k, v] of CompletionMap.entries())
            out.push({ text: v.text, value: k })

        return out
    }

    get completionIcon(): string {
        return CompletionMap.get(this.completion.value)?.icon || ''
    }

    error<T>(i: input<T>): string[] {
        return i.error === '' ? [] : [i.error]
    }
}
</script>
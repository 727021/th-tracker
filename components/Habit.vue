<template>
    <v-list-item>
        <v-list-item-content
            class="pointer noselect"
            @dblclick.prevent="editHabit()"
        >
            <v-list-item-title
                :class="{
                    'text-decoration-line-through text--disabled': isComplete
                }"
            >
                {{ habit.title }}
            </v-list-item-title>
            <v-list-item-subtitle
                :class="{
                    'text-decoration-line-through text--disabled': isComplete
                }"
            >
                {{ habit.description }}
            </v-list-item-subtitle>
            <div class="text-center w-100">
                <v-checkbox
                    v-if="habit.completion.type === Completion.CHECK"
                    :label="isComplete ? 'Completed' : 'Incomplete'"
                    :value="isComplete"
                    @input="complete"
                    style="display: inline-block"
                    color="purple"
                ></v-checkbox>
                <v-text-field
                    v-else-if="habit.completion.type === Completion.TEXT"
                    clearable
                    prepend-icon="mdi-form-textbox"
                    :disabled="loading"
                    :value="completion"
                    @input="complete"
                ></v-text-field>
                <v-rating
                    v-else-if="habit.completion.type === Completion.STARS"
                    half-increments
                    :value="completion"
                    hover
                    @input="complete"
                    color="purple"
                    background-color="purple lighten-1"
                    class="text-center"
                    :readonly="loading"
                ></v-rating>
                <v-text-field
                    v-else-if="habit.completion.type === Completion.NUMBER"
                    type="number"
                    clearable
                    :value="completion"
                    @input="complete"
                    :disabled="loading"
                    prepend-icon="mdi-counter"
                ></v-text-field>
            </div>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

import type { APIHabit } from '~/@types/habit'
import { Completion } from '~/@types/habit'
import { COMPLETE_HABIT } from '~/@types/mutation-types'
import dateToNumber from '~/api/util/dateToNumber'

@Component
export default class Habit extends Vue {
    @Prop({ required: true }) readonly habit!: APIHabit

    loading: boolean = false

    readonly Completion = {
        CHECK: Completion.CHECK,
        TEXT: Completion.TEXT,
        STARS: Completion.STARS,
        NUMBER: Completion.NUMBER
    } as const

    get completion() {
        const out = this.habit.completion.days.find(
            d => d.dateCompare === dateToNumber(this.$store.state.selectedDay)
        )?.completion

        if (out === undefined) {
            switch (this.habit.completion.type) {
                case Completion.CHECK:
                    return false
                case Completion.TEXT:
                    return ''
                case Completion.STARS:
                case Completion.NUMBER:
                    return null
            }
        }

        return out
    }

    get isComplete() {
        switch (this.habit.completion.type) {
            case Completion.CHECK:
                return this.completion
            case Completion.TEXT:
                return this.completion !== ''
            case Completion.STARS:
            case Completion.NUMBER:
                return this.completion !== null
        }
    }

    editHabit() {
        // this.$router.push(`/habit/${this.habit._id}`)
        console.log('Edit Habit', this.habit._id)
    }

    complete(e: any) {
        console.log('Complete Habit', e)
    }
}
</script>

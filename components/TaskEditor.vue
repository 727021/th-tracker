<template>
    <v-container class="my-1">
        <v-card
            color="warning"
            :width="$device.isMobile ? '' : '50%'"
            class="mx-auto pa-1"
        >
            <v-card-title class="white--text">
                {{ taskId ? 'Edit' : 'New' }} Task
            </v-card-title>
            <v-card class="pa-1">
                <form @submit.prevent="save">
                    <v-text-field
                        v-model="title.value"
                        prepend-icon="mdi-format-title"
                        label="Task Title"
                        counter="64"
                        maxlength="64"
                        clearable
                        :error-messages="
                            title.error === '' ? [] : [title.error]
                        "
                    ></v-text-field>
                    <v-textarea
                        v-model="description.value"
                        label="Task Description"
                        prepend-icon="mdi-comment"
                        auto-grow
                        counter="128"
                        maxlength="128"
                        clearable
                        :error-messages="
                            description.error === '' ? [] : [description.error]
                        "
                    ></v-textarea>
                    <v-divider></v-divider>
                    <DatePickerModal
                        label="Task Date"
                        v-model="date.value"
                        clearable
                        :error-messages="date.error === '' ? [] : [date.error]"
                    />
                    <v-divider></v-divider>
                    <div class="d-flex align-center justify-center">
                        <v-btn text color="error" small to="/"> Cancel </v-btn>
                        <v-btn text color="success" type="submit">Save</v-btn>
                    </div>
                </form>
            </v-card>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { StatusCodes } from 'http-status-codes'
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ITask } from '~/api/models/task'

type Editing = Pick<ITask, 'date' | 'title' | 'description'>

interface input {
    value: string
    error: string
}

@Component
export default class TaskEditor extends Vue {
    @Prop() readonly id!: string | undefined

    date: input = {
        value: this.$store.state.selectedDay,
        error: ''
    }
    title: input = {
        value: '',
        error: ''
    }
    description: input = {
        value: '',
        error: ''
    }
    taskId: string | undefined = this.id

    async save() {
        this.date.error = ''
        this.title.error = ''
        this.description.error = ''
        try {
            if (!this.taskId)
                await this.$axios.$post('/api/task', {
                    date: this.date.value,
                    title: this.title.value,
                    description: this.description.value
                })
            else
                await this.$axios.$put(`/api/task/${this.taskId}`, {
                    date: this.date.value,
                    title: this.title.value,
                    description: this.description.value
                })

            this.$router.push('/')
        } catch (err) {
            if (err.response.status !== StatusCodes.UNPROCESSABLE_ENTITY)
                return this.$nuxt.error({
                    message: err.message ?? err.response?.data?.error,
                    statusCode: err.response?.status
                })

            for (const { param, msg } of err.response.data.errors) {
                switch (param) {
                    case 'date':
                        this.date.error = msg
                        break
                    case 'title':
                        this.title.error = msg
                        break
                    case 'description':
                        this.description.error = msg
                        break
                }
            }
        }
    }

    async mounted() {
        if (this.taskId) {
            const {
                date,
                title,
                description
            }: Editing = await this.$axios.$get<Editing>(
                `/api/task/${this.taskId}`
            )

            this.date.value = date
            this.title.value = title
            this.description.value = description
        }
    }
}
</script>
<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col>
                <v-card>
                    <v-card-title>{{
                        register ? 'Create Account' : 'Log In'
                    }}</v-card-title>
                    <v-divider></v-divider>
                    <v-form class="px-5" v-if="!$device.isMobile">
                        <v-row v-if="error">
                            <v-col align="center">
                                <v-alert
                                    type="error"
                                    dense
                                    text
                                    class="d-inline-block mt-2"
                                    >{{ error }}</v-alert
                                >
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="username.value"
                                    label="Username"
                                    :counter="register ? 20 : undefined"
                                    :hint="
                                        register
                                            ? 'Must start with a letter or number and contain only letters, numbers, and underscores'
                                            : undefined
                                    "
                                    autocomplete="username"
                                    :error-messages="
                                        username.error === ''
                                            ? []
                                            : [username.error]
                                    "
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="password.value"
                                    label="Password"
                                    :hint="
                                        register
                                            ? 'Must be at least 8 characters long'
                                            : undefined
                                    "
                                    :type="password.show ? 'text' : 'password'"
                                    :append-icon="
                                        password.show
                                            ? 'mdi-eye'
                                            : 'mdi-eye-off'
                                    "
                                    @click:append="
                                        password.show = !password.show
                                    "
                                    :autocomplete="
                                        register
                                            ? 'new-password'
                                            : 'current-password'
                                    "
                                    :error-messages="
                                        password.error === ''
                                            ? []
                                            : [password.error]
                                    "
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="register">
                            <v-col>
                                <v-text-field
                                    v-model="email.value"
                                    label="E-Mail Address"
                                    type="email"
                                    autocomplete="email"
                                    :error-messages="
                                        email.error === '' ? [] : [email.error]
                                    "
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="confirm.value"
                                    label="Confirm Password"
                                    :type="confirm.show ? 'text' : 'password'"
                                    :append-icon="
                                        confirm.show ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append="confirm.show = !confirm.show"
                                    autocomplete="new-password"
                                    :error-messages="
                                        confirm.error === ''
                                            ? []
                                            : [confirm.error]
                                    "
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-form class="px-5" v-else>
                        <!-- TODO One-column form for mobile -->
                    </v-form>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-row>
                            <v-col align="right"
                                ><v-btn @click="onLogin">Log In</v-btn></v-col
                            >
                            <v-col align="left"
                                ><v-btn @click="onCreateAccount"
                                    >Create Account</v-btn
                                ></v-col
                            >
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { StatusCodes } from 'http-status-codes'

interface form {
    username: {
        value: string
        error: string
    }
    email: {
        value: string
        error: string
    }
    password: {
        value: string
        error: string
        show: boolean
    }
    confirm: {
        value: string
        error: string
        show: boolean
    }
    error: string
    register: boolean
}

export default Vue.extend({
    name: 'Index',
    head: { title: 'Login or Register' },
    auth: false,
    layout: ctx => (ctx.isMobile ? 'mobile' : 'default'),
    data: () => {
        const form: form = {
            username: {
                value: '',
                error: ''
            },
            email: {
                value: '',
                error: ''
            },
            password: {
                value: '',
                error: '',
                show: false
            },
            confirm: {
                value: '',
                error: '',
                show: false
            },
            error: '',
            register: false
        }

        return { ...form }
    },
    methods: {
        async onLogin() {
            this.error = ''
            this.username.error = ''
            this.email.error = ''
            this.password.error = ''
            this.confirm.error = ''
            if (this.register) {
                this.register = false
                this.email.value = ''
                this.confirm.value = ''
                return
            }

            try {
                await this.$auth.login({
                    username: this.username.value,
                    password: this.password.value
                })
            } catch (err) {
                if (err.response.status == StatusCodes.CONFLICT)
                    this.error = err.response.data.error
                else throw err
            }
        },
        async onCreateAccount() {
            this.error = ''
            this.username.error = ''
            this.email.error = ''
            this.password.error = ''
            this.confirm.error = ''
            if (!this.register) {
                this.register = true
                return
            }

            try {
                const { username } = await this.$axios.$post(
                    '/api/auth/register',
                    {
                        username: this.username.value,
                        password: this.password.value,
                        email: this.email.value,
                        confirm: this.confirm.value
                    }
                )

                this.password.value = ''
                this.username.value = username
                this.register = false
            } catch (err) {
                if (err.response.status !== StatusCodes.UNPROCESSABLE_ENTITY)
                    throw err

                for (const { param, msg } of err.response.data.errors) {
                    switch (param) {
                        case 'username':
                            this.username.error = msg
                            break
                        case 'email':
                            this.email.error = msg
                            break
                        case 'password':
                            this.password.error = msg
                            break
                        case 'confirm':
                            this.confirm.error = msg
                            break
                    }
                }
            }
        }
    }
})
</script>

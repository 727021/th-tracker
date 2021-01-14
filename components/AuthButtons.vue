<template>
    <div>
        <v-btn v-if="$auth.loggedIn" @click="logout" plain>
            <span>Log Out <fa-icon icon="sign-out-alt" /></span>
        </v-btn>
        <v-btn v-else @click="login" plain>
            <span>Log In <fa-icon icon="sign-in-alt" /></span>
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { RESET_STATE } from '@/@types/mutation-types'

export default Vue.extend({
    name: 'AuthButtons',
    methods: {
        async logout() {
            await this.$auth.logout()
            this.$store.commit(RESET_STATE)
        },
        login() {
            this.$router.push('/auth')
        }
    }
})
</script>
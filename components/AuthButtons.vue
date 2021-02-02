<template>
    <div>
        <v-btn v-if="$auth.loggedIn" @click="logout" plain>
            <span>Log Out <v-icon dense>mdi-login</v-icon></span>
        </v-btn>
        <v-btn v-else @click="login" plain>
            <span>Log In <v-icon dense>mdi-logout</v-icon></span>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RESET_STATE } from '~/@types/mutation-types'

@Component
export default class AuthButtons extends Vue {
    async logout() {
        await this.$auth.logout()
        this.$store.commit(RESET_STATE)
    }

    login() {
        this.$router.push('/auth')
    }
}
</script>
<template>
    <v-app-bar app>
        <v-row>
            <v-col align-self="center">
                <BackButton />
            </v-col>
            <v-col align-self="center" class="text-center">
                <v-toolbar-title>Tracker</v-toolbar-title>
            </v-col>
            <v-col align-self="center" class="text-right">
                <AuthButtons v-if="$nuxt.$route.path !== '/auth'" />
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Header'
})
</script>
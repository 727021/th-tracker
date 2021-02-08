<template>
    <v-app-bar app>
        <v-row align="center">
            <v-col cols="4" no-gutters> </v-col>
            <v-col cols="4" no-gutters align="center">
                <v-toolbar-title>Tracker</v-toolbar-title>
            </v-col>
            <v-col cols="4" no-gutters align="right">
                <AuthButtons v-if="$nuxt.$route.path !== '/auth'" />
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>
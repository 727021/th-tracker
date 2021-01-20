<template>
    <v-app dark>
        <Header />
        <v-main>
            <nuxt />
        </v-main>
        <Footer />
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Default extends Vue {}
</script>

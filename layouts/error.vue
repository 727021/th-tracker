<template>
    <v-container class="text-center">
        <h1>Error</h1>
        <p>{{ error.message }}</p>
        <br />
        <v-btn to="/home">Go Home</v-btn>
    </v-container>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Error extends Vue {
    @Prop() readonly error!: any
}
</script>
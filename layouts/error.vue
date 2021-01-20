<template>
    <v-container>
        <h1 class="text-center">Error</h1>
        <p>{{ error.message }}</p>
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
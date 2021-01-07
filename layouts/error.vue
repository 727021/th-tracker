<template>
    <v-container>
        <h1 class="text-center">Error</h1>
        <p>{{ error.message }}</p>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['error'],
    layout: ctx => (ctx.isMobile ? 'mobile' : 'default')
})
</script>
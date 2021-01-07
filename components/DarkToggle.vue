<template>
    <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" plain>
        <span v-if="$vuetify.theme.dark">
            Dark <fa-icon :icon="['far', 'moon']" />
        </span>
        <span v-else> Light <fa-icon :icon="['far', 'sun']" /> </span>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DarkToggle'
})
</script>
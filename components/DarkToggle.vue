<template>
    <v-tooltip :left="left" :right="right" :top="top" :bottom="bottom">
        <template #activator="{ on, attrs }">
            <v-btn
                v-on="on"
                v-bind="attrs"
                @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                icon
                ><fa-icon size="lg" icon="adjust"
            /></v-btn>
        </template>
        <span>{{ $vuetify.theme.dark ? 'Light' : 'Dark' }} Mode</span>
    </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DarkToggle',
    props: {
        top: Boolean,
        bottom: Boolean,
        left: Boolean,
        right: Boolean
    }
})
</script>
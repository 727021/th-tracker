<template>
    <v-footer
        padless
        fixed
        class="d-flex justify-space-between align-center py-2 px-5"
    >
        <span class="text--secondary"
            ><fa-icon size="sm" :icon="['far', 'copyright']" />
            {{ new Date().getFullYear() }}</span
        >
        <span>
            <DarkToggle
                v-model="$vuetify.theme.dark"
                button-tag="v-btn"
                plain
                font-awesome="fa-icon"
            />
            <v-btn
                icon
                plain
                href="https://github.com/727021/Todo-Tracker"
                target="_blank"
            >
                <fa-icon size="lg" :icon="['fab', 'github']" />
            </v-btn>
        </span>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Footer'
})
</script>
<template>
    <v-footer padless fixed class="d-flex justify-space-between py-2 px-5">
        <span
            ><fa-icon :icon="['far', 'copyright']" />
            {{ new Date().getFullYear() }}</span
        >
        <span>
            <DarkToggle left />
            <v-btn icon href="https://727021.github.io" target="_blank">
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
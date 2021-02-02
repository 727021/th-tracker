<template>
    <v-footer
        padless
        fixed
        app
        class="d-flex justify-space-between align-center py-2 px-5"
    >
        <span class="text--secondary"
            ><v-icon small class="text--secondary">mdi-copyright</v-icon>
            {{ new Date().getFullYear() }}</span
        >
        <span>
            <DarkToggle
                v-model="$vuetify.theme.dark"
                button-tag="v-btn"
                plain
            />
            <v-btn
                icon
                plain
                href="https://github.com/727021/Todo-Tracker"
                target="_blank"
            >
                <v-icon small>mdi-github</v-icon>
            </v-btn>
        </span>
    </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
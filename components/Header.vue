<template>
    <v-app-bar app>
        <v-app-bar-nav-icon :disabled="!canGoBack" @click="goBack">
            <fa-icon size="lg" icon="chevron-left" />
        </v-app-bar-nav-icon>
        <v-spacer v-if="!$device.isMobile"></v-spacer>
        <v-toolbar-title>Tracker</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { CAN_GO_BACK } from '@/store/getter-types'
import { GO_BACK } from '@/store/mutation-types'

export default Vue.extend({
    name: 'Header',
    computed: {
        ...mapGetters({
            canGoBack: CAN_GO_BACK
        })
    },
    methods: {
        ...mapMutations({
            goBack: GO_BACK
        })
    }
})
</script>
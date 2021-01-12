<template>
    <v-btn v-if="canGoBack" @click="goBack" plain>
        <span><fa-icon icon="chevron-left" /> Back</span>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { CAN_GO_BACK } from '@/@types/getter-types'
import { GO_BACK } from '@/@types/mutation-types'

export default Vue.extend({
    name: 'BackButton',
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

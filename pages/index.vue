<template>
    <div>
        Homepage
        <v-btn @click="goForward">{{ $store.state.i }}</v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { GO_FORWARD } from '@/store/mutation-types'

export default Vue.extend({
    name: 'Index',
    head: { title: 'Home' },
    auth: false,
    layout: ctx => (ctx.isMobile ? 'mobile' : 'default'),
    methods: {
        ...mapMutations({
            goForward: GO_FORWARD
        })
    }
})
</script>

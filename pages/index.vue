<template>
    <div>
        <h1>Homepage</h1>
        <p>Welcome, {{ $auth.user.username }}.</p>
        <v-btn @click="goForward">{{ $store.state.i }}</v-btn>
        <Calendar />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import { GO_FORWARD } from '@/store/mutation-types'

export default Vue.extend({
    name: 'Index',
    head: { title: 'Home' },
    methods: {
        ...mapMutations({
            goForward: GO_FORWARD
        })
    }
})
</script>

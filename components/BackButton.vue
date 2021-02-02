<template>
    <v-btn v-if="canGoBack" @click="goBack" plain>
        <span><v-icon>mdi-chevron-left</v-icon> Back</span>
    </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

import { CAN_GO_BACK } from '~/@types/getter-types'
import { GO_BACK } from '~/@types/mutation-types'

@Component
export default class BackButton extends Vue {
    @Getter(CAN_GO_BACK) canGoBack: any
    @Mutation(GO_BACK) goBack: any
}
</script>

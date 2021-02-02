<template>
    <component :is="buttonTag" @click="$emit('input', !value)" v-bind="$attrs">
        <span v-if="value">
            <slot name="dark">
                Dark
                <v-icon small>mdi-theme-light-dark</v-icon>
            </slot>
        </span>
        <span v-else>
            <slot name="light">
                Light
                <v-icon small>mdi-theme-light-dark</v-icon>
            </slot>
        </span>
    </component>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DarkToggle extends Vue {
    @Prop() readonly value!: boolean | undefined
    @Prop({ default: 'button' }) readonly buttonTag!: string
}
</script>
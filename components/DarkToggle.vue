<template>
    <component :is="buttonTag" @click="$emit('input', !value)" v-bind="$attrs">
        <span v-if="value">
            <slot name="dark">
                Dark
                <component
                    v-if="fontAwesome"
                    :is="fontAwesome"
                    :icon="['far', 'moon']"
                />
            </slot>
        </span>
        <span v-else>
            <slot name="light">
                Light
                <component
                    v-if="fontAwesome"
                    :is="fontAwesome"
                    :icon="['far', 'sun']"
                />
            </slot>
        </span>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DarkToggle',
    props: {
        value: Boolean,
        buttonTag: {
            type: String,
            default: 'button'
        },
        fontAwesome: String
    }
})
</script>
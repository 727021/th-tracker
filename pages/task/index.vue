<template>
    <TaskEditor />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({ head: { title: 'New Task' }, transition: 'slide-left' })
export default class NewTask extends Vue {}
</script>
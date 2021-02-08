<template>
    <TaskEditor :id="$route.params.id" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({ head: { title: 'Edit Task' }, transition: 'slide-left' })
export default class EditTask extends Vue {}
</script>
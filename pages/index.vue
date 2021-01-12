<template>
    <v-container class="my-1">
        <v-row>
            <v-col>
                <Calendar />
            </v-col>
            <v-divider style="min-height: 85vh" vertical></v-divider>
            <v-col>
                Tasks
            </v-col>
            <v-divider style="min-height: 85vh" vertical></v-divider>
            <v-col>
                Habits
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Index',
    head: { title: 'Home' }
})
</script>

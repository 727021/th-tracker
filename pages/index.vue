<template>
    <EditTask v-if="$store.state.editTask" />
    <EditHabit v-else-if="$store.state.editHabit" />
    <div v-else>
        <v-container class="my-1">
            <v-row>
                <v-col>
                    <Calendar />
                </v-col>
                <v-divider style="min-height: 80vh" vertical></v-divider>
                <v-col>
                    <TaskList />
                </v-col>
                <v-divider style="min-height: 80vh" vertical></v-divider>
                <v-col>
                    <HabitList />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({ head: { title: 'Home' } })
export default class Index extends Vue {}
</script>

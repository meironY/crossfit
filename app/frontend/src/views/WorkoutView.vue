<template>
    <div v-if="currentWorkout">
        <div>{{ formatDate(currentWorkout?.start_time) }}</div>
        <div>Duration: {{ currentWorkout?.duration }}</div>
        <TrainerItem v-for="trainer in currentWorkout.trainers" :trainer="trainer" :workout="currentWorkout" :last_workout="currentWorkout.start_time"/>
    </div>
</template>
<script lang="ts">
import type { Workout } from '@/models/inerfaces';
import TrainerItem from '@/components/TrainerItem.vue';
export default {
    props: {
        id: { type: String, default: null },
        coachId: { type: String, default: null }
    },
    created() {
        this.$store.dispatch('getWorkout', { coachId: this.coachId, workoutId: this.id })
    },
    computed: {
        currentWorkout(): Workout {
            return this.$store.state.currentWorkout
        },
    },
    components: {
        TrainerItem
    },
    methods: {
        formatDate(date: Date): string {
            const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        },
    }

}
</script>
<style scoped></style>
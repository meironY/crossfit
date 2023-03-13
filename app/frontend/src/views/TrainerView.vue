<template>
    <div v-if="currentTrainer">
        <div>{{ currentTrainer?.name }}</div>
        <div>{{ currentTrainer?.email }}</div>
        <WorkoutItem v-for="workout in currentTrainer.workouts" :workout="workout"></WorkoutItem>
    </div>
</template>
<script lang="ts">
import type { Trainer } from '@/models/inerfaces';
import WorkoutItem from '@/components/WorkoutItem.vue';
export default {
    props: {
        id: { type: Number, default: null },
        coachId: { type: Number, default: null }
    },
    created() {
        this.$store.dispatch('getTrainer', { coachId: this.coachId, trainerId: this.id })
    },
    computed: {
        currentTrainer(): Trainer {
            return this.$store.state.currentTrainer
        },
    }, 
    components: {
        WorkoutItem
    },

}
</script>
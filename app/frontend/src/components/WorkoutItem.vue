<template>
    <div class="workout-table" v-if="workout">
        <div class="workout-row">
            <div class="workout-cell">
                {{ formatDate(workout.start_time) }}
            </div>
            <div class="workout-cell">
                {{ workout.duration }} hours
            </div>
            <router-link :to="'/coach/' + workout?.coach_id + '/workout/' + workout.id" class="workout-cell">
                <span class="workout-header">show</span>
            </router-link>
            <div v-if="setWorkoutToEdit != null" class="workout-cell" @click="handleEdit">
                <span class="workout-header">Edit</span>
            </div>
            <div @click="deleteHandle" class="workout-cell">
                <span class="workout-header">Delete</span>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
export default {
    name: 'WorkoutItem',
    props: {
        workout: Object,
        setWorkoutToEdit: { type: Function, default: null }
    },
    methods: {
        deleteHandle() {
            console.log(this.workout?.coach_id, this.workout?.id)
            this.$store.dispatch('deleteWorkout', { coachId: this.workout?.coach_id, workoutId: this.workout?.id })
        },
        formatDate(date: Date): string {
            const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        },
        handleEdit() {
            this.setWorkoutToEdit(this.workout)
        }
    }
}
</script>
  
<style scoped>
.workout-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.workout-row {
    display: flex;
    width: 450px;
    justify-content: space-between;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
}

.workout-cell {
    display: flex;
}

.workout-header {
    font-weight: bold;
    margin-bottom: 8px;
}
</style>
  
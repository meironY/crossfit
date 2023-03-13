<template>
    <div v-if="currentCoach">
        <div class="navbar">
            <div class="navbar-item" @click="createWorkoutPress = true">Create Workout</div>
            <div @click="deleteCoach" class="navbar-item">Delete Coach</div>
            <div class="navbar-item" @click="updateCoachTogle = !updateCoachTogle">
                {{ !updateCoachTogle ? "Edit" : "Cancel Edit" }} Coach
            </div>
            <div class="navbar-item" @click="createTrainerPress = true">Create New Trainer</div>
        </div>

        <h2>{{ currentCoach.name }} Details</h2>
        <p>{{ currentCoach.email }}</p>
    </div>
    <CoachCreate v-if="updateCoachTogle" :submit="editCoach" :coach="currentCoach" />
    <WorkoutCreate v-if="createWorkoutPress || workoutToUpdate" :workout="workoutToUpdate ? workoutToUpdate : undefined"
        :trainers="currentCoach.trainers" :submitEvent="handleCreateWorkout" />
    <TrainerEdit v-if="createTrainerPress || trainerToUpdate" :trainer="trainerToUpdate ? trainerToUpdate : undefined"
        :submit="handleCreateTrainer" />
    <div class="container-coach-data">
        <div>
            <h2>trainers</h2>
            <div v-if="currentCoach">
                <TrainerItem v-for="trainer in currentCoach.trainers" :key="trainer.id" :trainer="trainer"
                    :last_workout="trainer.last_practice?.start_time" :setTrainerToEdit="editOfTrainerHandle" />
            </div>
        </div>
        <div>
            <h2>workouts</h2>
            <div v-if="currentCoach">
                <WorkoutItem v-for="workout in currentCoach.workouts" :key="workout.id" :workout="workout"
                    :setWorkoutToEdit="editOfWorkoutHandle" />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import type { Coach, CoachBody, Trainer, TrainerBody, Workout, WorkoutBody } from '@/models/inerfaces';
import TrainerItem from '@/components/TrainerItem.vue';
import WorkoutItem from '@/components/WorkoutItem.vue';
import TrainerEdit from '@/components/TrainerEdit.vue';
import WorkoutCreate from '@/components/WorkoutCreate.vue';
import CoachCreate from '@/components/CoachCreate.vue';


export default {
    props: ['id'],
    data() {
        return {
            createWorkoutPress: false,
            createTrainerPress: false,
            trainerToUpdate: null as Trainer | null,
            workoutToUpdate: null as Workout | null,
            updateCoachTogle: false
        }
    },
    created() {
        this.$store.dispatch('getCoach', this.id);
    },
    computed: {
        currentCoach(): Coach {
            console.log(this.$store.state.currentCoach)
            return this.$store.state.currentCoach
        },
    },
    components: { TrainerItem, WorkoutItem, TrainerEdit, WorkoutCreate, CoachCreate },
    methods: {
        handleCreateWorkout(data: WorkoutBody) {
            if (this.workoutToUpdate) {
                this.$store.dispatch('updateWorkout', { coachId: this.id, workoutId: this.workoutToUpdate.id, updatedWorkout: data })
            } else {
                this.$store.dispatch('addWorkout', { coachId: this.id, newWorkout: data })
            }
            this.createWorkoutPress = false
        },
        handleCreateTrainer(data: TrainerBody) {
            if (this.trainerToUpdate) {
                this.$store.dispatch('updateTrainer', { coachId: this.id, trainerId: this.trainerToUpdate.id, updatedTrainer: data })
            } else {
                this.$store.dispatch('addTrainer', { coachId: this.id, newTrainer: data })
            }
            this.createTrainerPress = false
            this.trainerToUpdate = null
        },
        deleteCoach() {
            this.$store.dispatch('deleteCoach', this.id)
            this.$router.push('/')
        },
        editOfTrainerHandle(trainer: Trainer) {
            this.trainerToUpdate = trainer
        },
        editOfWorkoutHandle(workout: Workout) {
            this.workoutToUpdate = workout
        },
        editCoach(data: CoachBody) {
            this.$store.dispatch('updateCoach', { id: this.id, updateCoach: data })
            this.updateCoachTogle = false
        },
    }
}
</script>
  
<style scoped>
.container-coach-data {
    display: flex;
    gap: 30px;
}

.container-coach-data>div {
    flex: 1;
}

.container-coach-data h2 {
    margin-bottom: 10px;
}

.container-coach-data>div>div {
    border: 1px solid gray;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.container-coach-data>div>div:last-child {
    margin-bottom: 0;
}

.navbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
    background-color: #eee;
    padding: 10px;
}

.navbar-item {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.navbar-item:hover {
    background-color: #ccc;
}
</style>
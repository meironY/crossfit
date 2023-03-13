
<template>
    <div class="workout-form">
        <label for="datetime-input">Date and Time:</label>
        <input type="datetime-local" id="datetime-input" v-model="datetime">

        <label for="number-input">Duration:</label>
        <input type="number" id="number-input" v-model.number="duration">

        <label for="trainer-select">Select a Trainer:</label>
        <select id="trainer-select" @change="addTrainer" v-model="selectedTrainer">
            <option v-for="trainer in trainers" :key="trainer.id" :value="trainer">{{ trainer.name }}</option>
        </select>
        <ul>
            <li v-for="trainer in selectedTrainers" :key="trainer.id">
                {{ trainer.name }}
                <button @click="removeTrainer(trainer)">Remove</button>
            </li>
        </ul>

        <button @click="submitData">Submit</button>
    </div>
</template>

<script lang="ts">
import type { Trainer, WorkoutBody } from '@/models/inerfaces';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'WorkoutForm',
    props: {
        trainers: Object,
        submitEvent: { type: Function as PropType<(data: WorkoutBody) => void>, required: true },
        workout: { type: Object, default: null },
    },
    data() {
        return {
            datetime: this.workout ? this.workout.start_time : '',
            duration: this.workout ? this.workout.duration : null,
            selectedTrainer: null as Trainer | null,
            selectedTrainers: this.workout && this.workout.trainers ? this.workout.trainers : [] as Trainer[],
        };
    },
    methods: {
        addTrainer() {
            console.log("ny trainers", this.selectedTrainer)

            const trainer: Trainer = this.trainers?.find((t: { id: number; name: string; email: string; created_at?: string | undefined; updated_at?: string | undefined; coach_id: number; }) => t.id === this.selectedTrainer?.id);
            if (trainer && !this.selectedTrainers.includes(trainer)) {
                console.log(trainer)
                this.selectedTrainers.push(trainer);
            }
            this.selectedTrainers = [...new Set(this.selectedTrainers)]
        },
        removeTrainer(trainer: Trainer) {
            const index = this.selectedTrainers.indexOf(trainer);
            if (index !== -1) {
                this.selectedTrainers.splice(index, 1);
            }
        },
        submitData() {
            console.log(this)
            if (!this.duration || !this.datetime || this.selectedTrainers.length == 0 || this.duration <= 0) {
                return
            }
            const data = {
                start_time: this.datetime,
                duration: this.duration,
                trainer_ids: this.selectedTrainers.map((trainer: Trainer) => trainer.id)
            }
            console.log("my data", data)
            this.submitEvent(data);
        }
    },
});
</script>
<style scoped>
.workout-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.workout-form label {
    font-weight: bold;
}

.workout-form input[type="datetime-local"],
.workout-form input[type="number"],
.workout-form select {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
    font-size: 16px;
}

.workout-form button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s ease;
}
</style>

  
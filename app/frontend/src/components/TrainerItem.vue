<template>
    <div class="trainer-container" v-if="trainer">
        <div class="trainer-row">
            <div class="trainer-cell trainer-name">{{ trainer.name }}</div>
            <div class="trainer-cell trainer-email">{{ trainer.email }}</div>
            <div class="trainer-cell trainer-last-workout">{{ last_workout ?
                formatDate(last_workout) : "don't have yet" }}</div>
            <div class="trainer-cell trainer-action">
                <router-link class="edit-button"
                    :to="'/coach/' + trainer?.coach_id + '/trainer/' + trainer.id">show</router-link>
                <span v-if="setTrainerToEdit != null" class="edit-button" @click="handleEdit">edit</span>
                <span class="delete-button" @click="deleteHandle">delete</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { Trainer } from '@/models/inerfaces';

export default {
    name: 'TrainerItem',
    props: {
        trainer: Object,
        setTrainerToEdit: { type: Function, default: null },
        last_workout: { type: Date, default: null }
    },
    methods: {
        deleteHandle() {
            console.log(this.trainer?.coach_id, this.trainer?.id)
            this.$store.dispatch('deleteTrainer', { coachId: this.trainer?.coach_id, trainerId: this.trainer?.id })
        },
        formatDate(date: Date): string {
            const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        },
        handleShow() {
            this.$store.dispatch('getTrainer', { coachId: this.trainer?.coach_id, trainerId: this.trainer?.id })
        },
        handleEdit() {
            this.setTrainerToEdit(this.trainer)
        }
    }
}
</script>
<style scoped>
.trainer-container {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.trainer-row {
    display: table-row;
    border-bottom: 1px solid #ccc;
}

.trainer-cell {
    display: table-cell;
    padding: 8px;
}

.trainer-name {
    font-weight: bold;
}

.trainer-action {
    text-align: right;
}

.edit-button {
    margin-right: 8px;
}

.delete-button {
    color: red;
    cursor: pointer;
}
</style>
<template>
    <div class="trainer-edit">
        <label for="name-input">Name:</label>
        <input type="text" id="name-input" v-model="name">

        <label for="email-input">Email:</label>
        <input type="email" id="email-input" v-model="email">

        <button @click="submitData">{{ trainer ? 'Update' : 'Create' }}</button>
    </div>
</template>
  
<script lang="ts">
import type { Trainer, TrainerBody } from '@/models/inerfaces';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'TrainerEdit',
    data() {
        return {
            name: this.trainer ? this.trainer.name : '',
            email: this.trainer ? this.trainer.email : ''
        }
    },
    props: {
        trainer: { type: Object, default: null },
        id: Number,
        submit: { required: true, type: Function as PropType<(data: TrainerBody) => void> }
    },
    methods: {
        submitData() {
            const data = { name: this.name, email: this.email }
            this.submit(data)
        }
    }
})
</script>

<style scoped>
.trainer-edit {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

label {
    font-weight: bold;
}

input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

button:hover {
    background-color: #388e3c;
}
</style>
  
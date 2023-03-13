<template>
    <div class="trainer-edit">
        <label for="name-input">Name:</label>
        <input type="text" id="name-input" v-model="name">

        <label for="email-input">Email:</label>
        <input type="email" id="email-input" v-model="email">

        <button @click="submitData">{{ coach ? 'Update' : 'Create' }}</button>
    </div>
</template>
  
<script lang="ts">
import type { CoachBody, } from '@/models/inerfaces';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'CoachCreate',
    data() {
        return {
            name: this.coach ? this.coach.name : '',
            email: this.coach ? this.coach.email : ''
        }
    },
    props: {
        coach: { type: Object, default: null },
        id: Number,
        submit: { required: true, type: Function as PropType<(data: CoachBody) => void> }
    },
    methods: {
        submitData() {
            const data  = { name: this.name, email: this.email } as CoachBody
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
  
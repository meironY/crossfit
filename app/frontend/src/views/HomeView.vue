<template>
  <div class="login-container">
    <h2 class="login-header">Login: Please choose a coach</h2>
    <h4 class="create-toggle" @click="createToggle = !createToggle">{{ createToggle ? "Cancel" : "Create new coach" }}
    </h4>
    <CoachCreate v-if="createToggle" :submit="addCoach" />
    <ul class="coach-list">
      <li v-for="coach in coaches" :key="coach.id" class="coach-item">
        <router-link :to="'/coach/' + coach.id" class="coach-link">{{ coach.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Coach, CoachBody } from '@/models/inerfaces';
import CoachCreate from '@/components/CoachCreate.vue';

export default {
  data() {
    return {
      createToggle: false
    }
  },
  created() {
    this.$store.dispatch('getCoaches');
  },
  computed: {
    coaches(): Coach[] {
      return this.$store.state.coaches
    },
  },
  methods: {
    addCoach(data: CoachBody) {
      this.$store.dispatch("addNewCoach", data)
      this.createToggle = false
    }
  },
  components: {
    CoachCreate,
  }
}
</script>

<style scoped>
.login-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.login-header {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.create-toggle {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
}

.coach-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.coach-item {
  margin-bottom: 0.5rem;
}

.coach-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f2f2f2;
  color: #333;
  text-decoration: none;
  border-radius: 0.3rem;
  transition: background-color 0.3s;
}

.coach-link:hover {
  background-color: #e2e2e2;
}
</style>

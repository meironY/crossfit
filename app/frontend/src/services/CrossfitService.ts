import axios from 'axios'
import type { CoachBody } from '@/models/inerfaces'
import type { TrainerBody } from '@/models/inerfaces'
import type { WorkoutBody } from '@/models/inerfaces'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCoaches() {
    return apiClient.get('/coaches')
  },
  getCoach(id: number) {
    return apiClient.get('/coaches/' + id)
  },
  getCoachTrainers(coachId: number) {
    return apiClient.get(`/coaches/${coachId}/trainers `)
  },
  getCoachTrainer(coachId: number, trainerId: number) {
    return apiClient.get(`/coaches/${coachId}/trainers/${trainerId} `)
  },
  getCoachWorkouts(coachId: number) {
    return apiClient.get(`/coaches/${coachId}/workouts `)
  },
  getCoachWorkout(coachId: number, workoutId: number) {
    return apiClient.get(`/coaches/${coachId}/workouts/${workoutId} `)
  },
  createCoach(data: CoachBody) {
    return apiClient.post('/coaches', data)
  },
  updateCoach(id: number, data: CoachBody) {
    return apiClient.put('/coaches/' + id, data)
  },
  deleteCoach(id: number) {
    return apiClient.delete('/coaches/' + id)
  },
  createCoachTrainer(coachId: number, data: TrainerBody) {
    return apiClient.post(`/coaches/${coachId}/trainers`, data)
  },
  updateCoachTrainer(coachId: number, trainerId: number, data: TrainerBody) {
    return apiClient.put(`/coaches/${coachId}/trainers/${trainerId}`, data)
  },
  deleteCoachTrainer(coachId: number, trainerId: number) {
    return apiClient.delete(`/coaches/${coachId}/trainers/${trainerId} `)
  },
  createCoachWorkout(coachId: number, data: WorkoutBody) {
    return apiClient.post(`/coaches/${coachId}/workouts `, data)
  },
  updateCoachWorkout(coachId: number, workoutId: number, data: WorkoutBody) {
    return apiClient.put(`/coaches/${coachId}/workouts/${workoutId} `, data)
  },
  deleteCoachWorkout(coachId: number, workoutId: number) {
    return apiClient.delete(`/coaches/${coachId}/workouts/${workoutId} `)
  }
}

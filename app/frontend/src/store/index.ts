import { createStore } from 'vuex'
import CrossfitService from '@/services/CrossfitService'
import type {
  Coach,
  CoachBody,
  Trainer,
  TrainerBody,
  Workout,
  WorkoutBody
} from '@/models/inerfaces'
import type { State } from 'vue'

export default createStore({
  state: {
    coaches: [] as Coach[],
    currentCoach: null as Coach | null,
    currentTrainer: null as Trainer | null,
    currentWorkout: null as Workout | null,
    error: null as null | string
  },
  mutations: {
    SET_ERROR(state: State, message: string) {
      state.error = message
    },
    SET_COACHES(state: State, coaches: Coach[]) {
      state.coaches = coaches
    },
    SET_COACH(state: State, coach: Coach) {
      state.currentCoach = coach
      state.coaches.push(coach)
    },
    UPDATE_COACH(state: State, coach: Coach) {
      state.currentCoach = coach
      state.coaches.forEach((coa) => {
        if (coach.id == coa.id) {
          coa = coach
        }
      })
    },
    SET_COACH_TRAINER(state: State, trainer: Trainer) {
      state.currentTrainer = trainer
    },
    SET_COACH_WORKOUT(state: State, workout: Workout) {
      state.currentWorkout = workout
    },
    ADD_COACH(state: State, coach: Coach) {
      state.coaches.push(coach)
      state.currentCoach = coach
    },
    DELETE_COACH(state: State, coachId: number) {
      state.coaches = state.coaches.filter((coach: Coach) => coach.id != coachId)
      state.currentCoach = null
    },
    ADD_TRAINER(state: State, trainer: Trainer) {
      state.currentTrainer = trainer
      state.currentCoach.trainers.push(trainer)
    },
    UPDATE_TRAINER(state: State, trainer: Trainer) {
      state.currentTrainer = trainer
      state.currentCoach.trainers.forEach((tr: Trainer) => {
        if (tr.id == trainer.id) {
          tr = trainer
        }
      })
    },
    DELETE_TRAINER(state: State, trainerId: number) {
      state.currentTrainer = null
      state.currentCoach.trainers = state.currentCoach.trainers.filter(
        (trainer: Trainer) => trainer.id != trainerId
      )
    },
    ADD_WORKOUT(state: State, workout: Workout) {
      state.currentWorkout = workout
      state.currentCoach.workouts.push(workout)
      state.currentCoach.trainers.forEach((trainer: Trainer, i: number) => {
        if (workout.trainers?.some((wkTrainer: Trainer) => wkTrainer.id == trainer.id)) {
          state.currentCoach.trainers[i].last_practice.start_time = workout.start_time
        }
      })
    },
    UPDATE_WORKOUT(state: State, workout: Workout) {
      state.currentWorkout = workout
      state.currentCoach.workouts.forEach((wk: Workout) => {
        if (wk.id == workout.id) {
          wk = workout
        }
      })
    },
    DELETE_WORKOUT(state: State, workoutId: number) {
      state.currentWorkout = null
      state.currentCoach.workouts = state.currentCoach.workouts.filter(
        (workout: Workout) => workout.id != workoutId
      )
    }
  },
  actions: {
    async getCoaches({ commit }: { commit: Function }) {
      try {
        const { data } = await CrossfitService.getCoaches()
        console.log(data)
        commit('SET_COACHES', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async getCoach({ commit }: { commit: Function }, coachId: number) {
      try {
        const { data } = await CrossfitService.getCoach(coachId)
        console.log(data)
        commit('SET_COACH', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async getTrainer(
      { commit }: { commit: Function },
      payload: { coachId: number; trainerId: number }
    ) {
      try {
        const { data } = await CrossfitService.getCoachTrainer(payload.coachId, payload.trainerId)
        commit('SET_COACH_TRAINER', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async getWorkout(
      { commit }: { commit: Function },
      payload: { coachId: number; workoutId: number }
    ) {
      try {
        const { data } = await CrossfitService.getCoachWorkout(payload.coachId, payload.workoutId)
        console.log({ data })
        commit('SET_COACH_WORKOUT', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async addNewCoach({ commit }: { commit: Function }, newCoach: CoachBody) {
      try {
        const { data } = await CrossfitService.createCoach(newCoach)
        commit('ADD_COACH', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async updateCoach(
      { commit }: { commit: Function },
      { updateCoach, id }: { updateCoach: CoachBody; id: number }
    ) {
      try {
        const { data } = await CrossfitService.updateCoach(id, updateCoach)
        commit('UPDATE_COACH', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async deleteCoach({ commit }: { commit: Function }, coachId: number) {
      try {
        await CrossfitService.deleteCoach(coachId)
        commit('DELETE_COACH', coachId)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async addTrainer(
      { commit }: { commit: Function },
      { coachId, newTrainer }: { coachId: number; newTrainer: TrainerBody }
    ) {
      try {
        const { data } = await CrossfitService.createCoachTrainer(coachId, newTrainer)
        commit('ADD_TRAINER', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async updateTrainer(
      { commit }: { commit: Function },
      {
        coachId,
        trainerId,
        updatedTrainer
      }: { coachId: number; trainerId: number; updatedTrainer: Trainer }
    ) {
      try {
        const { data } = await CrossfitService.updateCoachTrainer(
          coachId,
          trainerId,
          updatedTrainer
        )
        commit('UPDATE_TRAINER', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async deleteTrainer(
      { commit }: { commit: Function },
      { coachId, trainerId }: { coachId: number; trainerId: number }
    ) {
      try {
        await CrossfitService.deleteCoachTrainer(coachId, trainerId)
        commit('DELETE_TRAINER', trainerId)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async addWorkout(
      { commit }: { commit: Function },
      { coachId, newWorkout }: { coachId: number; newWorkout: WorkoutBody }
    ) {
      try {
        const { data } = await CrossfitService.createCoachWorkout(coachId, newWorkout)
        commit('ADD_WORKOUT', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async updateWorkout(
      { commit }: { commit: Function },
      {
        coachId,
        workoutId,
        updatedWorkout
      }: { coachId: number; workoutId: number; updatedWorkout: WorkoutBody }
    ) {
      try {
        const { data } = await CrossfitService.updateCoachWorkout(
          coachId,
          workoutId,
          updatedWorkout
        )
        commit('UPDATE_WORKOUT', data)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    },
    async deleteWorkout(
      { commit }: { commit: Function },
      { coachId, workoutId }: { coachId: number; workoutId: number }
    ) {
      try {
        await CrossfitService.deleteCoachWorkout(coachId, workoutId)
        commit('DELETE_WORKOUT', workoutId)
        commit('SET_ERROR', null)
      } catch (e: any) {
        console.log(e)
        commit('SET_ERROR', e.message)
      }
    }
  },
  modules: {}
})

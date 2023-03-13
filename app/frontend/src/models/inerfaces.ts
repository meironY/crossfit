export interface CoachBody {
  name: string
  email: string
}
export interface TrainerBody {
  name: string
  email: string
}
export interface WorkoutBody {
  start_time: string
  duration: number
  trainer_ids: number[]
}
export interface Trainer {
  [x: string]: any
  id: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
  coach_id: number
  workouts?: Workout[]
}
export interface Workout {
  start_time: Date
  duration: number
  id?: number
  coach_id: number
  created_at?: string
  updated_at?: string
  trainers?: Trainer[]
}

export interface Coach {
  id: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
  trainers?: Trainer[]
  workouts?: Workout[]
}

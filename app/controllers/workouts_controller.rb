class WorkoutsController < ApplicationController
    before_action :set_coach
    before_action :check_trainer_ids_exist, only: [:create,:edit]
    before_action :set_workout, only: [:show, :edit, :update, :destroy]
  
    def index
        @workouts = @coach.workouts.includes(:trainers)
        render json: @workouts, include: :trainers
    end

    def show
        render json: @workout.to_json(include: :trainers)
    end
  
    def create
        @workout = @coach.workouts.build(workout_params)
    
        if @workout.save
          params[:trainer_ids].each do |trainer_id|
            @workout.trainer_workouts.create(trainer_id: trainer_id)
          end

          @workout.trainers.reload
          render json: @workout.to_json(include: :trainers)
        else
          render json: @workout.errors, status: :unprocessable_entity
        end
    end

    def update
      if @workout.update(workout_params) 
        trainer_workouts = @workout.trainer_workouts.to_a
        submitted_trainer_ids = params[:trainer_ids].map(&:to_i)
      
        submitted_trainer_ids.each do |trainer_id|
          unless trainer_workouts.find { |tw| tw.trainer_id == trainer_id }
            trainer_workouts << TrainerWorkout.new(trainer_id: trainer_id, workout_id: @workout.id)
          end
        end
      
        @workout.trainer_workouts.where.not(trainer_id: submitted_trainer_ids).destroy_all
        if trainer_workouts.map(&:save).all?
          @workout.trainers.reload
          render json: @workout.to_json(include: :trainers)
        else
          render json: { status: :error, message: 'There was an error updating the workout.' }
        end
      else
          render json: { status: :error, message: 'There was an error updating the workout.' }
      end
    end

    def destroy
      @workout = Workout.where(id: params[:id]).first 
      TrainerWorkout.where(workout_id: @workout.id).destroy_all
      @workout.destroy
      
      render json: { status: :success, message: 'Workout and associated TrainerWorkout objects were successfully deleted.' }
    end

    private
  
    def set_coach
      @coach = Coach.where(id: params[:coach_id]).first
    end

    def set_workout
        @workout = Workout.includes(:trainers).where(id: params[:id]).first
      end
  
    def workout_params
      params.require(:workout).permit(:start_time, :duration)
    end

    def check_trainer_ids_exist
      trainer_ids = params[:trainer_ids]
      if trainer_ids.present? && !all_trainers_exist?(trainer_ids)
        render json: { error: "One or more trainer_ids do not exist" }, status: :unprocessable_entity
        return
      end
    end
    
    def all_trainers_exist?(trainer_ids)
      Trainer.where(id: trainer_ids).count == trainer_ids.length
    end
  end
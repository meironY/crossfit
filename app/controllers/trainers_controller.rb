class TrainersController < ApplicationController
    before_action :set_coach
    before_action :set_trainer, only: [:show, :update, :destroy]
      def index
        @trainers = @coach.trainers
        render json: @trainers
      end
    
      def show
         render json: @trainer.to_json(include: [:workouts]) 
      end
    
      def create
        @trainer = @coach.trainers.new(trainer_params)
        if @trainer.save
          render json: @trainer, status: :created, location: coach_trainers_url(@trainer) 
        else
          render json: @trainer.errors, status: :unprocessable_entity
        end
      end
      
    
      def update
          if @trainer.update(trainer_params)
            render json: @trainer, status: :ok
          else
             render json: @trainer.errors, status: :unprocessable_entity 
          end
      end
    
      def destroy
        TrainerWorkout.where(trainer_id: @trainer.id).destroy_all
        @trainer.destroy
        render json: { status: :success, message: 'Trainer and associated TrainerWorkout objects were successfully deleted.' }
      end
    
      private

      def set_coach
        @coach = Coach.where(id: params[:coach_id]).first
      end

      def set_trainer
        @trainer = @coach.trainers.where(id: params[:id]).first
      end
    
      def trainer_params
        params.require(:trainer).permit(:name, :email)
      end
end

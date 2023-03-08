class TrainersController < ApplicationController
    before_action :set_coach
    before_action :set_trainee, only: [:show, :update, :destroy]
    def index
        @trainers = @coach.trainers
        respond_to do |format|
            format.html # Render the HTML view
            format.json { render json: @trainers } # Render a JSON response
          end
      end
    
      def show
        respond_to do |format|
            format.html # Render the HTML view
            format.json { render json: @trainer } # Render a JSON response
          end
      end
    
      def new
        @trainer = @coach.trainers.new
      end
    
      def create
        respond_to do |format|
            if @trainer.save
              format.html { redirect_to coach_trainer_path(current_coach, @trainer), notice: 'trainer was successfully created.' }
              format.json { render json: @trainer, status: :created, location: @trainer }
            else
              format.html { render :new }
              format.json { render json: @trainer.errors, status: :unprocessable_entity }
            end
          end
      end
    
      def update
        respond_to do |format| 
          if @trainer.update(trainer_params)
            format.html { redirect_to coach_trainer_path(@couch, @trainer) }
            format.json { render json: @trainer, status: :ok }
          else
            format.html { render :edit }
            format.json { render json: @trainer.errors, status: :unprocessable_entity }
          end
      end
    
      def destroy
        @trainer.destroy
    
        respond_to do |format|
          format.html { redirect_to coach_trainers_path(@coach) }
          format.json { head :nocontent }
        end
      end
    
      private

      def set_coach
        @coach = Coach.find(params[:coach_id])
      end

      def set_trainee
        @trainer = @coach.trainers.find(params[:id])
      end
    
      def trainer_params
        params.require(:trainer).permit(:name, :email)
      end
end

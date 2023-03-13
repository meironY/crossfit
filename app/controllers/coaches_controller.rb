class CoachesController < ApplicationController
  before_action :set_coach, only: [:show, :edit, :update, :destroy]
  def index
    @coaches = Coach.all
    render json: @coaches  # Render a JSON response
  end

  def show
    @coach = Coach.includes(:trainers, :workouts).find(params[:id])
    render json: @coach.as_json(include: [:trainers, :workouts])
  end

  def new
    @coach = Coach.new
  end

  def create
    @coach = Coach.new(coach_params)
      if @coach.save
        render json: @coach, status: :created
      else
        render json: @coach.errors, status: :unprocessable_entity
      end
  end

  def update
    if @coach.update(coach_params)
        render json: @coach, status: :ok
    else
        render json: @coach.errors, status: :unprocessable_entity 
    end
  end

  def destroy
    @coach.trainers.destroy_all
    @coach.workouts.destroy_all
    @coach.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_coach
    @coach = Coach.find(params[:id])
  end

  def coach_params
    params.require(:coach).permit(:name, :email)
  end
end

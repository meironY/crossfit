class CoachesController < ApplicationController
  before_action :set_coach, only: [:show, :edit, :update, :destroy]
  def index
    @coaches = Coach.all
    respond_to do |format|
      format.html # Render the HTML view
      format.json { render json: @coaches } # Render a JSON response
    end
  end

  def show
    respond_to do |format|
      format.html
      formmat.json { render json: @coach }
  end

  def new
    @coach = Coach.new
  end

  def create
    respond_to do |format|
      if @coach.save
        format.html { redirect_to @coach }
        format.json { render json: @coach, status: :created }
      else
        format.html { render :new }
        format.json { render json: @coach.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if @coach.update(coach_params)
      respond_to do |format|
        format.html { redirect_to @coach }
        format.json { render json: @coach, status: :ok }
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.json { render json: @coach.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @coach.destroy

    respond_to do |format|
      format.html { redirect_to coaches_path }
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

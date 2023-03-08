class TrainerWorkout < ApplicationRecord
  belongs_to :workout
  belongs_to :trainer
end

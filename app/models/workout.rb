class Workout < ApplicationRecord
  belongs_to :coach
  has_many :trainer_workouts ,dependent: :delete_all
  has_many :trainers, through: :trainer_workouts
end

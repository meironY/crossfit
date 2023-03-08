class Trainer < ApplicationRecord
    belongs_to :coach
    has_many :trainer_workouts
    has_many :workouts, through: :trainer_workouts
end

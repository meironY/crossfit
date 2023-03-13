class Trainer < ApplicationRecord
    belongs_to :coach
    has_many :trainer_workouts,dependent: :delete_all
    has_many :workouts, through: :trainer_workouts

    def last_practice
        workouts.order(start_time: :desc).first
    end
end

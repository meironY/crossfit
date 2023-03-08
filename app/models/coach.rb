class Coach < ApplicationRecord
    has_many :trainers
    has_many :workouts
end

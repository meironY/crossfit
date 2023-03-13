class Coach < ApplicationRecord
    has_many :trainers,dependent: :delete_all
    has_many :workouts,dependent: :delete_all

    def as_json(options={})
        super(options.merge({
          include: {
            trainers: {
              include: {
                last_practice: { only: [:start_time,:id] }
              }
            },
            workouts: {}
          }
        }))
      end
end

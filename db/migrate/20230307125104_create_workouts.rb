class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.datetime :start_timee
      t.float :duration
      t.references :coach, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateTrainerWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :trainer_workouts do |t|
      t.references :workout, null: false, foreign_key: true
      t.references :trainer, null: false, foreign_key: true

      t.timestamps
    end
  end
end

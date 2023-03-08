class CreateTrainers < ActiveRecord::Migration[7.0]
  def change
    create_table :trainers do |t|
      t.string :name
      t.string :email
      t.integer :coach_id

      t.timestamps
    end
  end
end

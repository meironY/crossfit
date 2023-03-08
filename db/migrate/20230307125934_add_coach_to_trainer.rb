class AddCoachToTrainer < ActiveRecord::Migration[7.0]
  def change
    add_reference :trainers, :coach, null: false, foreign_key: true
  end
end

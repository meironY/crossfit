class RemoveCoachIdFromTrainer < ActiveRecord::Migration[7.0]
  def change
    remove_column :trainers, :coach_id, :integer
  end
end

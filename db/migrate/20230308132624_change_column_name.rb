class ChangeColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :workouts, :start_timee, :start_time
  end
end

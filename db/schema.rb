# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_08_132624) do
  create_table "coaches", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trainer_workouts", force: :cascade do |t|
    t.integer "workout_id", null: false
    t.integer "trainer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trainer_id"], name: "index_trainer_workouts_on_trainer_id"
    t.index ["workout_id"], name: "index_trainer_workouts_on_workout_id"
  end

  create_table "trainers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "coach_id", null: false
    t.index ["coach_id"], name: "index_trainers_on_coach_id"
  end

  create_table "workouts", force: :cascade do |t|
    t.datetime "start_time"
    t.float "duration"
    t.integer "coach_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_workouts_on_coach_id"
  end

  add_foreign_key "trainer_workouts", "trainers"
  add_foreign_key "trainer_workouts", "workouts"
  add_foreign_key "trainers", "coaches"
  add_foreign_key "workouts", "coaches"
end

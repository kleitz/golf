class CreateTees < ActiveRecord::Migration
  def change
    create_table :tees do |t|
      t.time :time
      t.integer :game_id
      t.timestamps
    end
  end
end

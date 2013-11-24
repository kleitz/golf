class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.date :game_date
      t.text :comments
      t.time :tee1
      t.time :tee2
      t.string :name

      t.timestamps
    end
  end
end

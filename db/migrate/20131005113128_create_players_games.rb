class CreatePlayersGames < ActiveRecord::Migration
  def change
    create_table :players_games do |t|
      t.integer :game_id
      t.integer :user_id
      t.boolean :reserve

      t.timestamps
    end
  end
end

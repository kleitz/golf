class Change < ActiveRecord::Migration
  def up
    rename_column :players_games, :user_name, :name
  end

  def down
    rename_column :players_games, :name, :user_name
  end
end

class AddUserNameToPlayersGame < ActiveRecord::Migration
  def change
  	add_column :players_games, :user_name ,:string
  end
end

class PlayersGame < ActiveRecord::Base
	
  belongs_to :user, foreign_key: 'user_id'
	belongs_to :game

  scope :reserves, ->{ where(reserve: true) }
  scope :not_reserves, ->{ where(reserve: false) }
end

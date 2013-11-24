class Game < ActiveRecord::Base
	has_many :players_games
	has_many :tees
	accepts_nested_attributes_for :players_games, allow_destroy: true
	accepts_nested_attributes_for :tees, allow_destroy: true
end

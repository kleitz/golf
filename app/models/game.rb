class Game < ActiveRecord::Base
	has_many :players_games, :dependent => :destroy
	has_many :tees, :dependent => :destroy
	accepts_nested_attributes_for :players_games, allow_destroy: true
	accepts_nested_attributes_for :tees, :reject_if => lambda { |a| a[:time].blank? }, allow_destroy: true
end

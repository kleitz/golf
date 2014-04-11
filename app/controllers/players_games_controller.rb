class PlayersGamesController < ApplicationController
	respond_to :json
  #before_action :admin, [:edit, :create, :update, :destroy]

  def index
    if params[:players]
      respond_with PlayersGame.where(:game_id => params[:players])
    elsif params[:reserves]
      respond_with PlayersGame.where(:game_id => params[:reserves], :reserve => true)
    elsif params[:game_id] && params[:user_id]
      respond_with PlayersGame.where(:game_id => params[:game_id], :user_id => params[:user_id])
    else
      respond_with PlayersGame.all
    end
  end

  def edit
    respond_with PlayersGame.find(params[:id])
  end

  def create
    respond_with PlayersGame.create(players_game_params)
  end

  def update
    respond_with PlayersGame.update(params[:id], players_game_params)
  end

  def show
    respond_with PlayersGame.find(params[:id])
  end

  def destroy
    @players_game = PlayersGame.find(params[:id])
    @players_game.destroy
    respond_with @players_game
  end

  private
  def players_game_params
    params.require(:players_game).permit(:id, :game_id, :user_id, :user_name, :reserve, :created_at, :updated_at)
  end
end

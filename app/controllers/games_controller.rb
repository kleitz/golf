class GamesController < ApplicationController
	respond_to :json

  def index
    if params[:id]
      respond_with Game.find(params[:id])
    else
      respond_with Game.all    
    end
  end

  def edit
    respond_with Game.find(params[:id])
  end

  def create
    respond_with Game.create(game_create_params)
  end

  def update
    respond_with Game.update(params[:id], game_update_params)   
  end

  def show
    respond_with Game.find(params[:id])
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    respond_with @game
  end

  private
  def game_update_params
    params.require(:game).permit(:id, :game_date, :comments, :tee1, :tee2, :name, :created_at, :updated_at)
  end

  def game_create_params
    params.require(:game).permit(:game_date, :comments, :tee1, :tee2, :name, :created_at, :updated_at)
  end
end

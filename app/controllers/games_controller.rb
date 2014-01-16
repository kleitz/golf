class GamesController < ApplicationController
	respond_to :json
  before_action :admin, only: [:edit, :create, :update, :destroy]

  def index
    if params[:id]
      @game = Game.find(params[:id])
      respond_to do |format|
        format.json { render :json => @game.to_json( :include => [:players_games, :tees] ) }
      end
    else
      @games = Game.all
      respond_to do |format|
        format.json { render :json => @games.to_json( :include => [:players_games, :tees] ) }
      end    
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
    @game = Game.find(params[:id])
    respond_to do |format|
      format.json { render :json => @game.to_json( :include => [:players_games, :tees] ) }
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @pg = @game.players_games
    @pg.each do |pg|
      pg.destroy
    end
    @tees = @game.tees
    @tees.each do |t|
      t.destroy
    end
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

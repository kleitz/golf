class PlayersGamesController < ApplicationController
	respond_to :json
  #before_action :admin, [:edit, :create, :update, :destroy]

  def index
    if params[:players]
      @pg = PlayersGame.where(:game_id => params[:players])
    elsif params[:reserves]
      @pg = PlayersGame.where(:game_id => params[:reserves], :reserve => true)
    elsif params[:game_id] && params[:user_id]
      @pg = PlayersGame.where(:game_id => params[:game_id], :user_id => params[:user_id])
    else
      @pg = PlayersGame.all
    end
    respond_to do |format|
      format.json { render :json => @pg.to_json( :include => [:user] ) }
    end
  end

  def edit
    @pg = PlayersGame.find(params[:id])
    respond_to do |format|
      format.json { render :json => @pg.to_json( :include => [:user] ) }
    end
  end

  def create
    @pg = PlayersGame.create(players_game_params)
    respond_to do |format|
      format.json { render :json => @pg.to_json( :include => [:user] ) }
    end
  end

  def update
    @pg =  PlayersGame.update(params[:id], players_game_params)
    respond_to do |format|
      format.json { render :json => @pg.to_json( :include => [:user] ) }
    end
  end

  def show
    @pg = PlayersGame.find(params[:id])
    respond_to do |format|
      format.json { render :json => @pg.to_json( :include => [:user] ) }
    end
  end

  def destroy
    @players_game = PlayersGame.find(params[:id])
    @players_game.destroy
    respond_with @players_game
  end

  private
  def players_game_params
    params.require(:players_game).permit(:id, :game_id, :user_id, :name, :reserve, :created_at, :updated_at)
  end
end

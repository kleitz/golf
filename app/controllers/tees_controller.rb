class TeesController < ApplicationController
	respond_to :json

  def index
    if params[:id]
      respond_with Tee.find(params[:id])
    elsif params[:game_id]
    	respond_with Tee.where(:game_id => params[:game_id])
    else
      respond_with Tee.all    
    end
  end

  def edit
    respond_with Tee.find(params[:id])
  end

  def create
    respond_with Tee.create(tee_params)
  end

  def update
    respond_with Tee.update(params[:id], tee_params)   
  end

  def show
    respond_with Tee.find(params[:id])
  end

  def destroy
    @tee = Tee.find(params[:id])
    @tee.destroy
    respond_with @tee
  end

  private
  def tee_params
    params.require(:tee).permit(:id, :game_id, :time, :venue, :created_at, :updated_at)
  end
end

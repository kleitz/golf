class UsersController < ApplicationController
	before_filter :authenticate_user!
  respond_to :html, :json

  def index
    @users = User.all 
    if params[:id]
      respond_with User.find(params[:id])
    else
      respond_with @users   
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:notice] = "User has been updated successfully!" 
      render :action => :show 
    else
      render :action => "edit" 
    end
  end


  def show
    respond_with @user = User.find(params[:id])
  end

  def destroy
    @user = User.find(params[:id])
    @pg = @user.players_games
    @user.destroy
    @pg.each do |pg|
      pg.destroy
    end
    redirect_to users_path
  end

  private
  def user_params
    params.require(:user).permit(:id, :name, :picture, :admin, :created_at, :updated_at, :date_of_birth, :username, :telephone, :email)
  end

end

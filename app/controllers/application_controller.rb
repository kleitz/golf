class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_action :logged_in, unless: :devise_controller?

  def index
  	render :layout =>	'application', :nothing => true
  end

  def after_sign_in_path_for(resource)
    "/#/home"
  end

  def after_inactive_sign_up_path_for(resource)
    "/#/home"
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit :username, :email, :password, :password_confirmation
    end
  end

  def logged_in
    redirect_to new_user_session_path unless current_user
  end

  def admin
    redirect_to :root unless current_user.admin 
  end

end

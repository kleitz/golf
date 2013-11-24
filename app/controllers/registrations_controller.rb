class RegistrationsController < Devise::RegistrationsController
	#before_filter :check_permissions, :only => [:new, :create, :cancel]
  skip_before_filter :require_no_authentication
 
  #def check_permissions
  # authorize! :create, resource
  #end

	def sign_up_params
	  params.require(:user).permit(:name, :picture, :date_of_birth, :username, :telephone, :email, :password, :password_confirmation, :current_password, :admin)
	end
	def account_update_params
	  params.require(:user).permit(:name, :picture, :date_of_birth, :username, :telephone, :email, :password, :password_confirmation, :current_password, :admin)
	end

	private :sign_up_params
	private :account_update_params

	protected

  def after_inactive_sign_up_path_for(resource)
    "/#/home"
  end

end

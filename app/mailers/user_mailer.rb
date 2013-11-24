class UserMailer < Devise::Mailer

  helper :application
  
  default from: "noreply@salaryapp.com"

  def welcome(user)
  	@user = user
  	
  	mail(:to => @user.email, :subject => "Välkommen till lönerapportsystemet")
  end

   def reset_password_instructions(record, opts={})
   	super
    devise_mail(record, :reset_password_instructions, opts)
  end

  def unlock_instructions(record, opts={})
  	super
    devise_mail(record, :unlock_instructions, opts)
  end

  def new_salary_report(user, salary_admin)
    @user = user
    mail(:to => salary_admin.email, :subject => "En ny lönerapport har skickats")
  end

  def reminder_email(user)
    @user = user
    mail(:to => @user.email, :subject => "Lönerapport Påminelse")
  end

  def approval_dissaproval_salary_report(user, salary_report)
    @user = user
    @salary_report = salary_report
    mail(:to => @user.email, :subject => "Din lönerapport har granskats")
  end

  def salary_report_updated(user, salary_report, salary_admin)
    @user = user
    @salary_report = salary_report
    mail(:to => salary_admin.email, :subject => "En lönerapport har uppdaterats")
  end
end

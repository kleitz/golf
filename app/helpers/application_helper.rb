module ApplicationHelper
	def cp(path)
  	"active" if current_page?(path)
	end

	def avatar_url(user)
    gravatar_id = Digest::MD5::hexdigest(user.email).downcase
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=150&d=mm"
  end
end

FactoryGirl.define do
	factory :user do
		name 'Jason Carty'
		password 'password'
		admin false
		confirmed_at '2013-01-01'
	end
end
FactoryGirl.define do
	factory :admin do
		name 'Jason Carty'
		password 'password'
		admin true
		confirmed_at '2013-01-01'
	end
end
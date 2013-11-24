# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "********Seeding Data Start************"

User.create(:name => "Jason Carty", :email => "jason@jcartydesign.com", :admin => true)
User.create(:name => "Ian Carty", :email => "ian@email.com", :admin => true)
User.create(:name => "Ryan Carty", :email => "ryan@email.com", :admin => true)
User.create(:name => "Maja Carty", :email => "maja@.com", :admin => true)
User.create(:name => "Peter Griffen", :email => "peter@email.com", :admin => true)
User.create(:name => "Roger Pontare", :email => "roger@email.com", :admin => true)
User.create(:name => "Tom Parsson", :email => "tom@email.com", :admin => true)
User.create(:name => "Meg Griffen", :email => "meg@email.com", :admin => true)
User.create(:name => "Wonder woman", :email => "wonder@email.com", :admin => true)
User.create(:name => "Mr X", :email => "mrx@email.com", :admin => true)
User.create(:name => "John Doe", :email => "john@email.com", :admin => true)

=begin
if newUser.errors.blank?
	puts "The user: #{newUser.name} has been created with these login details: Email: #{newUser.email}"
else
	puts "The user failed to create due to below reasons:"
    newUser.errors.each do |x, y|
       puts"#{x} #{y}" # x will be the field name and y will be the error on it
     end
end
=end


mail = UserMailer.welcome(newUser)
if mail.errors.blank?
	puts "The confirmation has been sent to #{newUser.email}"
else
	puts "The email failed to be sent due to below reasons:"
	mail.errors.each do |x,y|
		puts "#{x} #{y}"
	end
end

puts "********Seeding Data End************"


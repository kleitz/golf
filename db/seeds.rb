# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "********Seeding Data Start************"

#User.create(:name => "Jason Carty", :email => "jason@jcartydesign.com", :admin => true)
#User.create(:name => "Ian Carty", :email => "ian@email.com", :admin => true)
#User.create(:name => "Ryan Carty", :email => "ryan@email.com", :admin => true)
User.create(:name => "Anthony Botes", :email => "anthony@bohlaletours.co.za", :admin => false, :telephone => "083 253 0838")
User.create(:name => "Mark Ehlert", :email => "ehlertm@out.co.za", :admin => false, :telephone => "071 492 8965")
User.create(:name => "Rob Charlton", :email => "robc@rnad.co.za", :admin => false, :telephone => "084 443 2777")
User.create(:name => "Ryan Smith", :email => "ryan.smith@standardbank.co.za", :admin => false, :telephone => "082 394 2825")
User.create(:name => "Ian Hesse", :email => "hessian@telkomsa.net", :admin => false, :telephone => "081 354 2872")
User.create(:name => "Fanus Schmidt", :email => "estelle@thedrainsurgeon.co.za", :admin => false, :telephone => "082 928 7464")
User.create(:name => "Thomas Gallacher", :email => "thmsgal@gmail.com", :admin => false, :telephone => "012 6619548")
User.create(:name => "Nicholas Hawker", :email => "lhawker@iafrica.com", :admin => false, :telephone => "082 668 9634")

User.create(:name => "Jan Harm", :email => "jan.eloff@liblink.co.za", :admin => false, :telephone => "071 090 7342")
User.create(:name => "Graham Taylor", :email => "grahamat@telkomsa.net", :admin => false, :telephone => "083 625 0394")
User.create(:name => "Paul Inglesby", :email => "paulinglesby@telkomsa.net", :admin => false, :telephone => "0825694880")
User.create(:name => "Arthur Ehlert", :email => "ehlertag@mweb.co.za", :admin => false, :telephone => "072 600 8448")
User.create(:name => "Mark Smith", :email => "similiassmith@gmail.com", :admin => false, :telephone => "0731422620")
User.create(:name => "Garth Aikman", :email => "gartha@nedbank.co.za", :admin => false, :telephone => "0829049700")
User.create(:name => "Sifiso Motsa", :email => "sifisomotsa@gmail.com", :admin => false)
User.create(:name => "Raven Shabe", :email => "rshabe@jra.org.za", :admin => false)
User.create(:name => "Raymond Marais", :email => "raysemail@mweb.co.za", :admin => false, :telephone => "0716113379")

=begin
if newUser.errors.blank?
	puts "The user: #{newUser.name} has been created with these login details: Email: #{newUser.email}"
else
	puts "The user failed to create due to below reasons:"
    newUser.errors.each do |x, y|
       puts"#{x} #{y}" # x will be the field name and y will be the error on it
     end
end

mail = UserMailer.welcome(newUser)
if mail.errors.blank?
	puts "The confirmation has been sent to #{newUser.email}"
else
	puts "The email failed to be sent due to below reasons:"
	mail.errors.each do |x,y|
		puts "#{x} #{y}"
	end
end

=end

puts "********Seeding Data End************"


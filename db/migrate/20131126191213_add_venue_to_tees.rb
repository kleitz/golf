class AddVenueToTees < ActiveRecord::Migration
  def change

  	add_column :tees, :venue, :string
  end
end

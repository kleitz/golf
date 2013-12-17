class AddGravatarToUser < ActiveRecord::Migration
  def change
  	add_column :users, :gravatar_url, :string
  end
end

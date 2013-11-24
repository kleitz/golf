class ChangeTime < ActiveRecord::Migration
  def up
  	change_column :tees, :time, :string
  end

  def down
  	change_column :tees, :time, :time
  end
end

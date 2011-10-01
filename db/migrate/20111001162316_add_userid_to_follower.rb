class AddUseridToFollower < ActiveRecord::Migration
  def self.up
    add_column :followers, :user_id, :integer, :nil => false
  end

  def self.down
    remove_column :followers, :user_id
  end

end

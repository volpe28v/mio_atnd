class AddTwitterToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :twitter_id, :string, :nil => false
  end

  def self.down
    remove_column :users, :twitter_id
  end

end

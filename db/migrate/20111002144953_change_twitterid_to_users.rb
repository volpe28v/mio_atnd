class ChangeTwitteridToUsers < ActiveRecord::Migration
  def up
    rename_column :users, :twitter_id , :nickname
    rename_column :followers, :twitter_id , :nickname
  end

  def down
    rename_column :users, :nickname, :twitter_id
    rename_column :followers, :nickname, :twitter_id
  end
end

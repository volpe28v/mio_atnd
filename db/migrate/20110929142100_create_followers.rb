class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.string :twitter_id

      t.timestamps
    end
  end
end

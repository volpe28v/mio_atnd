# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)
    twitter_ids = [
      "snoozer05",
      "tricknotes",
      "irasally",
      "hachiilcane",
      "EnnuiR",
      "onjiro_mohyahya",
      "mrkn",
      "volpe_hd28v",
    ]

twitter_ids.each {|ti|
  Follower.create(:twitter_id => ti) if Follower.where(:twitter_id => ti).count == 0 
}


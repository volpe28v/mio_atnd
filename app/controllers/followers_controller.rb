class FollowersController < ApplicationController
  def index
    @followers = Follower.all
  end
end

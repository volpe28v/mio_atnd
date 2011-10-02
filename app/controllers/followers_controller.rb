class FollowersController < ApplicationController
  def index
    @followers = Follower.all
  end

  def new
    @user = User.find(params[:user_id])
    @follower = Follower.new
  end

  def create
    user = User.find(params[:user_id])
    follower = Follower.create(params[:follower])

    user.followers << follower
    redirect_to user
  end

  def show

  end
end

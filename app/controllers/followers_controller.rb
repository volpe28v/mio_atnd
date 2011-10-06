class FollowersController < ApplicationController
  def index
    @followers = Follower.all
  end

  def new
    @user = User.find(params[:user_id])
    @follower = Follower.new
  end

  def create
    @user = User.find(params[:user_id])
    if @user.followers.where(:nickname => params[:follower][:nickname]).count > 0 || 
       @user.nickname == params[:follower][:nickname]
      @follower = Follower.new
      render :action => 'new'
      return
    end

    follower = Follower.create(params[:follower])

    @user.followers << follower
    redirect_to @user
  end

  def show
  end

  def destroy
    @follower_id = params[:id]
    Follower.find(@follower_id).destroy
  end

end

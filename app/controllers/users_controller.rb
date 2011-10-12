class UsersController < ApplicationController
  def index
    @users = User.all
    if current_user 
      redirect_to current_user
    else
      redirect_to new_user_session_path
    end
  end

  def show
    @user = User.find(params[:id])
    if current_user != @user
      redirect_to current_user
    end

    @followers = @user.followers
  end
end

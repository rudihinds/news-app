class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create( user_params )
    
    if user.valid?
      render json: { user: user , token: issue_token(user_id: user.id) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :not_accepted
    end
  end

  private 

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
  end
end

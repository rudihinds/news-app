class Api::V1::UserSourcesController < ApplicationController


 def index
    @user = User.find_by(id: 1)
    favourite_sources = UserSource.get_my_favourite_sources(@user)
   #  @favourite_sources = @user.sources.all.map{ |source| source }.uniq
    render json: favourite_sources

 end


end

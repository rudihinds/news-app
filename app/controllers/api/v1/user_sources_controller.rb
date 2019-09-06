class Api::V1::UserSourcesController < ApplicationController
   # skip_before_action :authorize, only: [:index]
   
 def index
   #  @current_user = User.find_by(id: 1)
    user_sources = @current_user.sources
    render json: user_sources
 end
 

 def destroy
   
   user_source_id = UserSource.find_by(user: @current_user, source_id: params[:id]).id
   UserSource.delete(user_source_id)
   render json: {action: "Deleted"}
 end

 def create
   user_source = UserSource.create(user_id: @current_user.id, source_id: params[:sourceId])
   if user_source.valid?
      render json: {user_source: user_source}, status: :created
   else
      redner json: {errors: user_sources.errors.full_messages}, status: :not_accepted
   end
 end


end

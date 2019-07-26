class Api::V1::ArticlesController < ApplicationController

  def index
    # articles = @current_user ? @current_user.get_top_headlines : Article.get_top_headlines

    @top_headlines = Article.get_top_headlines
    render json: @top_headlines
  end


  
end

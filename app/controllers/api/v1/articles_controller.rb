class Api::V1::ArticlesController < ApplicationController
  skip_before_action :authorize, only: [:index]

  def index
    page = params[:page].to_i
    
    if params[:all]
      @top_headlines = Article.get_top_headlines(page: page)
      render json: @top_headlines, include: [:source]
    else
      articles = @current_user ? @current_user.get_top_headlines(page: page) : Article.get_top_headlines(page: page)
      render json: articles, include: [:source]
    end
  end
  
end

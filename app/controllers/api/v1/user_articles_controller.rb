class Api::V1::UserArticlesController < ApplicationController

    def index
        render json: {user_articles: @current_user.get_user_article_ids}
    end

    def create
      article = Article.find(params[:article_id])
      user_article = UserArticle.create(user: @current_user, article: article)
      
      if user_article.valid?
        render json: { user_article: user_article }, status: :created
      else
        render json: { errors: user_article.errors.full_messages }, status: :not_accepted
      end
    end

    def destroy
      user_article = @current_user.user_articles.find_by(article_id: params[:id])
      UserArticle.destroy(user_article.id)
      render json: {action: 'deleted'}
    end

    private

    def user_article_params
      params.require(:user_article).permit(:article_id)
    end
    
end

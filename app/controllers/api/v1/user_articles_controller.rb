class Api::V1::UserArticlesController < ApplicationController



    def index
        @user = User.find_by(id: 1)
        my_top_headlines = UserArticle.get_top_headlines_from_my_favourite_sources(@user)
        render json: my_top_headlines
    end
    
end

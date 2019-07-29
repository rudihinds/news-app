class UserArticle < ApplicationRecord
  belongs_to :user
  belongs_to :article


  def self.get_top_headlines_from_my_favourite_sources(user)

    my_api_ids = UserSource.get_my_favourite_sources(user).map{ |source| source.api_id }

    my_top_headlines = JSON.parse(RestClient.get("https://newsapi.org/v2/top-headlines?sources=#{my_api_ids.join(",")}&apiKey=e5160b6c2767490d80b97bf5b20fbc1b"))['articles']

    my_top_headlines.each do |headline|
      headline["url_to_image"] = headline.delete("urlToImage")
      headline["published_at"] = headline.delete("publishedAt")
      headline["source"] = Source.find_by(api_id: headline.delete('source')['id'])
    end

    my_top_headlines.each do |headline|
      UserArticle.find_or_create_by(user_id: user.id, article_id: Article.find_or_create_by(headline).id)
    end

  end


end

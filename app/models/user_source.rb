class UserSource < ApplicationRecord
  belongs_to :user
  belongs_to :source

  validates_uniqueness_of :source, scope: :user

  def self.get_my_favourite_sources(user)
    my_favourite_sources = user.sources.all.map{|source| source}.uniq
    my_favourite_sources
  end

end

  # def get_top_headlines_from_my_favourite_sources

  #   my_api_ids = get_my_favourite_sources.map{ |source| source.api_id }

  #   my_top_headlines = JSON.parse(RestClient.get("https://newsapi.org/v2/top-headlines?sources=#{my_api_ids.join(",")}&apiKey=e5160b6c2767490d80b97bf5b20fbc1b"))['articles']

  #   my_top_headlines.each do |headline|
  #     headline["url_to_image"] = headline.delete("urlToImage")
  #     headline["published_at"] = headline.delete("publishedAt")
  #     headline["source"] = Source.find_by(api_id: headline.delete('source')['id'])
  #   end

    # UserSource.create(user_id: @user.id, article_id:())
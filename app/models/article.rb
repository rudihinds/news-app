class Article < ApplicationRecord
  belongs_to :source
  
  # validates :url, :published_at, presence: true

  default_scope{ order(published_at: :desc) }

  def self.get_top_headlines(sources = Source.all.map{|source| source.api_id}, page = 1)
    
    articles = JSON.parse(RestClient.get("https://newsapi.org/v2/top-headlines?sources=#{sources.join(',')}&page=#{page}&apiKey=#{ENV["API_KEY"]}"))['articles']
    
    articles.each do |article|
      article["source"] = Source.find_by(api_id: article.delete("source")['id'])
      article["url_to_image"] = article.delete("urlToImage")
      article["published_at"] = article.delete("publishedAt")
    end
    
    articles.map{|article| Article.find_or_create_by(article)}
    
  end

end

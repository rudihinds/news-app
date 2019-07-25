class Article < ApplicationRecord
  belongs_to :source
  
  validates :url, :published_at, presence: true

  def self.getTopHeadlines(sources = Source.all.map{|source| source.api_id})
    
    articles = JSON.parse(RestClient.get("https://newsapi.org/v2/top-headlines?sources=#{sources.join(',')}&apiKey=#{ENV["API_KEY"]}"))['articles']
    
    articles.each do |article|
      article["source"] = Source.find_by(api_id: article.delete("source")['id'])
      article["url_to_image"] = article.delete("urlToImage")
      article["published_at"] = article.delete("publishedAt")
    end
    
    articles.each do |article|
      newArticle = Article.find_or_create_by(article)

    articles

  end

end

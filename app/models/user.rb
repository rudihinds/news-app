class User < ApplicationRecord
    has_many :user_sources
    has_many :sources, through: :user_sources
    has_many :user_articles
    has_many :saved_articles, through: :user_articles, source: :article
    has_many :sources, through: :user_sources
    has_many :articles, through: :sources
    has_secure_password

    validates :first_name, :last_name, :email, :username, presence: true
    validates :email, :username, uniqueness: true
    validates :password, length: { minimimum: 6, maximum: 20 }, allow_nil: true

    strip_attributes collapse_spaces: true, replace_newlines: true
    
    def get_top_headlines
        Article.getTopHeadlines(self.sources.map{|source| source.api_id})
    end

    def get_user_article_ids
      self.user_articles.map{|ua| ua.article.id}
    end
end

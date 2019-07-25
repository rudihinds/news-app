class Article < ApplicationRecord
  belongs_to :source

  validates :author, :description, :title, :url, :url_to_image, :published_at, :content, presence: true

end

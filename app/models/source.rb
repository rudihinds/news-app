class Source < ApplicationRecord

    validates :name, :description, :url, :category, :language, :country, presence: true
    
end

class User < ApplicationRecord
    has_many :user_sources
    has_many :user_articles
    has_many :articles, though: :user_articles
    has_many :sources, though: :user_sources
    has_secure_password

    validates :first_name, :last_name, :email, :username, presence: true
    validates :email, username, uniqueness: true
    validates :password, length: { minimimum: 6, maximum: 20 }, allow_nil: true

    strip_attributes collapse_spaces: true, replace_newlines: true
    

end

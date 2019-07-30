class UserArticle < ApplicationRecord
  belongs_to :user
  belongs_to :article

  validates_uniqueness_of :article, scope: :user
end

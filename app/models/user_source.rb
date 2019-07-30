class UserSource < ApplicationRecord
  belongs_to :user
  belongs_to :source

  validates_uniqueness_of :source, scope: :user

  def self.get_my_favourite_sources(user)
    my_favourite_sources = user.sources.all.map{|source| source}.uniq
    my_favourite_sources
  end

end
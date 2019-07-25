Rails.application.routes.draw do
  resources :user_sources
  resources :user_articles
  resources :articles
  resources :sources
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

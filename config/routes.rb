Rails.application.routes.draw do
  # resources :user_sources
  # resources :user_articles
  # resources :articles
  # resources :sources
  # resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
        resources :users, only: [:create, :update]
        resources :articles, only: [:index, :show]
        resources :sources, only: [:index]
        resources :user_sources, only: [:index, :create, :delete]
        resources :user_articles, only: [:index, :create, :delete]
        post '/login', to: 'auth#create'
        get '/validate', to: 'auth#validate'
    end
  end

end

Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  get 'user_posts' => 'posts#user_posts'
  resources :users
  resources :comments
  resources :posts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

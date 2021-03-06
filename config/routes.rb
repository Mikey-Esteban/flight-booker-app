Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :flights, only: :index
      resources :airports, only: :index
      resources :bookings, only: [:index, :show, :create]
    end
  end

  root to: "home#index"
  # handle routing for React Router components without interfering with Rails Routes
  get '*path', to: 'home#index', via: :all
end

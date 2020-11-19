Rails.application.routes.draw do
  resources :items
  resources :lists
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # test that we can get data from the backend
  # get '/test', to: 'application#test'
end

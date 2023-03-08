Rails.application.routes.draw do
  # get 'coaches/index'
  # get 'coaches/show'
  # get 'coaches/new'
  # get 'coaches/create'
  # get 'coaches/edit'
  # get 'coaches/update'
  # get 'coaches/destroy'
  resources :coaches do
    resources :trainers
    resources :workouts
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

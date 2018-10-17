Rails.application.routes.draw do
  root 'pages#index'
  match '*path', to: 'pages#index', :via => :all # it will catch all, then sent it to pages#action
end

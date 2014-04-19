require 'sinatra/base'
require 'sinatra/cross_origin'
require 'open-uri'

class App < Sinatra::Base
  register Sinatra::CrossOrigin

  configure do
    enable :cross_origin
  end

  set :allow_origin, :any
  set :allow_methods, [:get, :post, :options]
  set :allow_credentials, true
  set :max_age, "1728000"
  set :expose_headers, ['Content-Type']

  options '/:username' do
    calendar = open("https://github.com/users/#{params[:username]}/contributions_calendar_data").read
  end

end
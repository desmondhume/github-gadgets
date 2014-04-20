require 'sinatra/base'
require 'sinatra/cross_origin'
require 'open-uri'
require 'json'

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

  get '/' do
    'Not a single project home page was given that day'
  end

  # Route used by script to fetch data
  get '/:username/calendar' do
    content_type :json
    calendar = JSON.parse open("https://github.com/users/#{params[:username]}/contributions_calendar_data").read
    calendar.map! {|d| {date: Date.parse(d[0]).to_s, total: d[1]} }.to_json
  end

end
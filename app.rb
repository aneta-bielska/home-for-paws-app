require 'sinatra/base'
require 'sprockets'
require 'uglifier'
require 'sass'
require 'coffee-script'
require 'execjs'
require 'slim'

class App < Sinatra::Base
  set :environment, Sprockets::Environment.new

  environment.append_path "assets/stylesheets"
  environment.append_path "assets/javascripts"

  environment.js_compressor  = :uglify
  environment.css_compressor = :scss

  get "/assets/*" do
    env["PATH_INFO"].sub!("/assets", "")
    settings.environment.call(env)
  end

  get "/" do
    slim :index
  end
end

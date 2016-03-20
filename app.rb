require 'sinatra/base'
require 'sinatra/json'
require 'sprockets'
require 'react-jsx-sprockets'
require 'slim'

require 'pry'
require 'rerun'

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

  # temporary example api
  get "/api/pets.json" do
    dog = { id: 11, name: "Nasus", pet_type: "dog", date_of_birth: "2010-01-01", gender: "male"}
    cat = { id: 22, name: "Nyan",  pet_type: "cat", date_of_birth: "2011-02-02", gender: "female"}
    rat = { id: 55, name: "Brain", pet_type: "rat", date_of_birth: "1995-03-03", gender: "male"}

    case params[:pet_type]
    when 'cat' then data = [cat]
    when 'dog' then data = [dog]
    when 'other' then data = [rat]
    else
      data = [cat,dog,rat]
    end

    json data
  end
end

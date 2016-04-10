require 'sinatra/base'
require 'sinatra/json'
require 'sprockets'
require 'react-jsx-sprockets'
require 'slim'
require 'pry'
require 'rerun'

require './config/datamapper.rb'

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
    @shelters = Shelter.all
    slim :home
  end

  get "/animals" do
    slim :'animals/index'
  end

  get "/shelters/:id" do
    @shelter = Shelter.get(params[:id])
    slim :'shelters/show'
  end

  # temporary example api
  get "/api/animals.json" do
    compact_params(params)

    animal_params = params[:animals].to_h
    breed_params = params[:breeds].to_h.map { |k,v| [Animal.breed.send(k), v] }.to_h
    shelter_params = params[:shelters].to_h.map { |k,v| [Animal.shelter.send(k), v] }.to_h
    age_param = animal_params.delete('age')

    all_params = [animal_params, breed_params, shelter_params, processed_age(age_param)].inject(&:merge)

    json Animal.all(all_params)
  end

  post '/api/shelter-animals' do
    Animal.create(params[:animal])
    json Animal.all(shelter_id: params[:animal][:shelter_id])
  end

  private

  def compact_params(parameters)
    return unless parameters

    parameters.delete_if do |k, v|
      compact_params(v) if v.kind_of? Hash
      v == 'all' || v.empty?
    end
  end

  def processed_age(age_param)
    now = Date.today
    case age_param
    when 'puppy'
      {:date_of_birth.gt => now - 365}
    when 'young'
      {:date_of_birth.gt => now - 365*5, :date_of_birth.lt => now - 365}
    when 'middle'
      {:date_of_birth.gt => now - 365*8, :date_of_birth.lt => now - 365*5}
    when 'old'
      {:date_of_birth.lt => now - 365*8}
    else
      {}
    end
  end
end

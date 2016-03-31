require 'data_mapper'
require './models/animal.rb'

class Shelter
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :city, String
  property :region, String

  has n, :animals
end

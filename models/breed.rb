require 'data_mapper'
require './models/animal.rb'

class Breed
  include DataMapper::Resource

  property :id, Serial
  property :breed_name, String
  property :animal_type, String

  has n, :animals

  validates_within :size, set: [ 's', 'm', 'l' ]
end

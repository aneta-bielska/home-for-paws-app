require 'data_mapper'
require './shelter.rb'
require './breed.rb'

class Animal
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :adoption_status, String
  property :gender, String
  property :date_of_birth, Date

  belongs_to :shelter
  belongs_to :breed

  validates_within :adoption_status, set: [ 'today', 'preparation', 'ready', 'home' ]
  validates_within :gender, set: [ 'f', 'm']
end

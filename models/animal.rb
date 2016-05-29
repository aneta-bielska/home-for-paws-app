require 'data_mapper'
require './models/shelter.rb'
require './models/breed.rb'

class Animal
  include DataMapper::Resource

  property :id, Serial

  property :name, String
  property :adoption_status, String
  property :gender, String, default: ''
  property :color, String, default: ''
  property :size, String, default: ''
  property :date_of_birth, Date, required: false
  property :animal_type, String
  property :desc, Text
  property :photo, Text

  belongs_to :shelter
  belongs_to :breed

  validates_within :adoption_status, set: [ 'today', 'preparation', 'ready', 'home' ]
  validates_within :gender, set: [ 'f', 'm', '']
end

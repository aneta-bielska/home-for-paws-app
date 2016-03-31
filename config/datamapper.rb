require 'data_mapper'
require 'dm-core'
require 'dm-migrations'
require './models/breed.rb'
require './models/shelter.rb'
require './models/animal.rb'

DataMapper::setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/home_for_paws.db")
DataMapper.finalize.auto_upgrade!

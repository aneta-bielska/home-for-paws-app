require 'data_mapper'
require 'dm-core'
require 'dm-migrations'
require './breed.rb'
require './shelter.rb'
require './animal.rb'

DataMapper::setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/home_for_paws.db")
DataMapper.finalize.auto_upgrade!

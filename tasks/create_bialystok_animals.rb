require 'pry'
require 'nokogiri'
require 'open-uri'
require './config/datamapper.rb'

def create_dogs(pages, dir, status)
  (1..pages).to_a.each do |num|
    page = Nokogiri::HTML(open("http://www.schronisko.bialystok.pl/galeria/#{dir}?catpage=#{num}#subcategory"))

    page.css('.jg_subcatelem_cat').each do |animal_details|
      name = animal_details.css('.jg_subcatelem_txt')[0].css('a').text.strip
      desc = animal_details.css('.jg_subcatelem_txt')[0].css('p').text.strip
      photo = animal_details.css('img')[0]['src']

      create_params = {
        name: name,
        adoption_status: status,
        desc: desc,
        photo: photo,
        animal_type: 'dog',
        shelter_id: Shelter.first.id,
        breed_id: Breed.first.id
      }

      Animal.create(create_params)
    end
  end
end

Animal.all.destroy
Shelter.all.destroy
Breed.all.destroy

Shelter.create(name: 'Schroniko Białystok', city: 'bialystok', region: 'podlaskie')
Breed.create(breed_name: 'crossbreed', animal_type: 'dog')

puts "today"
create_dogs(2, 'dzis-trafilem', 'today')

puts "preparation"
create_dogs(2, 'przygotowanie-do-adopcji', 'preparation')

puts "ready"
create_dogs(7, 'psy-do-adopcji', 'ready')

puts "New dogs on board (#{Animal.all.count})"

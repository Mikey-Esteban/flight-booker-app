class Airport < ApplicationRecord
  has_many :departures, foreign_key: "origin_id", class_name: "Flight"
  has_many :arrivals, foreign_key: "destination_id", class_name: "Flight"
end

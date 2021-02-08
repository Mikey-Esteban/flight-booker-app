class Flight < ApplicationRecord
  has_many :bookings
  
  belongs_to :origin, class_name: "Airport"
  belongs_to :destination, class_name: "Airport"
end

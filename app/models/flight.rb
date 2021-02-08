class Flight < ApplicationRecord
  has_many :bookings
  has_many :passengers

  belongs_to :origin, class_name: "Airport"
  belongs_to :destination, class_name: "Airport"
end

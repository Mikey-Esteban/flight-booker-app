class Passenger < ApplicationRecord
  belongs_to :flight
  belongs_to :booking
end

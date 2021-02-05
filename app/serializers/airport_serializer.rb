class AirportSerializer
  include JSONAPI::Serializer
  attributes :code

  has_many :departures, serializer: FlightSerializer
  has_many :arrivals, serializer: FlightSerializer
end

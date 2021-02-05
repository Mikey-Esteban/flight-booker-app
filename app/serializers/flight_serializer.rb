class FlightSerializer
  include JSONAPI::Serializer
  attributes :duration, :start, :origin_id, :destination_id, :origin_code

  attribute :start do |flight|
    flight && flight.start.strftime('%m/%d/%Y %l:%M%P')
  end

  attribute :origin_code do |flight|
    data = {1 => 'JFK', 2 => 'LGA', 3 => 'NWK', 4 => 'SFO', 5 => 'LAX'}
    data[flight.origin_id]
  end

  attribute :destination_code do |flight|
    data = {1 => 'JFK', 2 => 'LGA', 3 => 'NWK', 4 => 'SFO', 5 => 'LAX'}
    data[flight.destination_id]
  end

end

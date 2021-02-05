require 'faker'

def generate_origin_and_destination_flight_ids
  sample = [1,2,3,4,5].sample(2)  # only have 5 airport ids to start
  origin_id = sample[0]
  destination_id = sample[1]

  return origin_id, destination_id
end

def generate_duration
  duration = rand(260..360)
  duration
end

def generate_start
  start = Faker::Time.between(from: DateTime.now, to: DateTime.now + 30) #=> "2014-09-18 12:30:59 -0700"
  start
end

airports = Airport.create([
  {
    code: 'JFK'
  },
  {
    code: 'LGA'
  },
  {
    code: 'NWK'
  },
  {
    code: 'SFO'
  },
  {
    code: 'LAX'
  }
])

flights = []

30.times do
  origin_id, destination_id = generate_origin_and_destination_flight_ids
  flight = Flight.create({
    start: generate_start,
    duration: generate_duration,
    origin_id: origin_id,
    destination_id: destination_id
  })

  flights << flight
end

class BookingSerializer
  include JSONAPI::Serializer
  attributes :flight_id

  has_many :passengers
end

class PassengerSerializer
  include JSONAPI::Serializer
  attributes :name, :email, :flight_id, :booking_id

end

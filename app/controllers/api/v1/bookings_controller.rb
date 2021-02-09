class Api::V1::BookingsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    bookings = Booking.all

    render json: BookingSerializer(bookings).serializable_hash.to_json
  end

  def show
    booking = Booking.find_by(id: params[:id])

    render json: BookingSerializer(booking).serializable_hash.to_json
  end

  def create
    flight = Flight.find_by(id: params[:booking][:flight_id])
    booking = flight.bookings.create(booking_params)
    passengers = params[:booking][:passengers]

    if booking.save
      passengers.each do |p|
        passenger = Passenger.create(name: p['name'], email: p['email'], flight_id: flight.id, booking_id: booking.id)
      end

      render json: BookingSerializer(booking).serializable_hash.to_json
    else
      render json: { error: booking.errors.messages }, status: 422
    end
  end


  private

  def booking_params
    params.require(:booking).permit(:flight_id)
  end

end

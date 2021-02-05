class Api::V1::FlightsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    flights = Flight.all.order(start: :asc)

    render json: FlightSerializer.new(flights).serializable_hash.to_json
  end

end

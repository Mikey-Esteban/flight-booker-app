class Api::V1::AirportsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    airports = Airport.all

    render json: AirportSerializer.new(airports).serializable_hash.to_json
  end

end

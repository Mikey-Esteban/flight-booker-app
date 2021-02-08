class Api::V1::FlightsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    flights = Flight.all.order(start: :asc)

    if params.keys.include?('from')
      origin_id = find_airport_id params['from']
      flights = flights.where('flights.origin_id = ?', origin_id)
    end

    if params.keys.include?('to')
      destination_id = find_airport_id params['to']
      flights = flights.where('flights.destination_id = ?', destination_id)
    end

    if params.keys.include?('date')
      formatted_date = format_date(params['date'])
      flights = flights.where("DATE(start) = ?", formatted_date)
    end

    render json: FlightSerializer.new(flights).serializable_hash.to_json
  end


  private

  def find_airport_id code
    airport = Airport.find_by(code: code)
    airport.id
  end

  def format_date date
    date_array = date.split('.')
    formatted_date = "#{date_array[2]}-#{date_array[0]}-#{date_array[1]}"
    formatted_date
  end

end

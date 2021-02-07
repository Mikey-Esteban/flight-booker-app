class Api::V1::FlightsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    puts "---------"
    puts "params: #{params}"
    puts "---------"
    if params.keys.include?('from')
      puts "whats up"
      puts "from: #{params['from']}"
      puts "..... finding airport_id for #{params['from']}"
      id = find_airport_id params['from']
      puts "..... airport_id: #{id}"
      flights = Flight.where('flights.origin_id = ?', id).order(start: :asc)
    else
      flights = Flight.all.order(start: :asc)
    end


    render json: FlightSerializer.new(flights).serializable_hash.to_json
  end


  private

  def find_airport_id code
    airport = Airport.find_by(code: code)
    airport.id
  end

end

class Api::V1::FlightsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    puts "---------"
    puts "params: #{params}"
    puts "---------"

    if params.keys.include?('from') && params.keys.include?('to')
      origin_id = find_airport_id params['from']
      destination_id = find_airport_id params['to']
      flights = Flight.where('flights.origin_id = ?', origin_id)
                      .where('flights.destination_id = ?', destination_id)
                      .order(start: :asc)
    elsif params.keys.include?('from')
      id = find_airport_id params['from']
      flights = Flight.where('flights.origin_id = ?', id).order(start: :asc)
    elsif params.keys.include?('to')
      id = find_airport_id params['to']
      flights = Flight.where('flights.destination_id = ?', id).order(start: :asc)
    else
      flights = Flight.all.order(start: :asc)
    end

    if params.keys.include?('date')
      puts " HI YOOOOOOOO"
      puts "flights so far.. #{flights.length}"
      formatted_date = format_date(params['date'])
      puts "date: #{formatted_date}"

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

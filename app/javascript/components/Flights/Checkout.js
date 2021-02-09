import React, { useState, Fragment } from 'react'
import axios from 'axios'

import Passenger from './Passenger'

const Checkout = (props) => {

  const flights = props.location.state.flights
  const numTickets = props.location.state.tickets
  const flight = flights[0]
  const passengers = []

  const handleSubmit = e => {
    e.preventDefault()
    console.log(passengers);

    const booking = {
      flight_id: flight.id,
      passengers: passengers
    }

    axios.post('/api/v1/bookings', {booking})
      .then( resp => {
        debugger
      })
      .catch( resp => console.log(resp))
  }

  const passengersList = []
  for (let i=0; i < numTickets; i++) {
    passengers.push({})
    passengersList.push(<Passenger passengers={passengers} id={i} key={i} />)
  }

  return (
    <Fragment>
      <div>[Checkout component, look up props in console]</div>
      <div className="flight-details">
        Flight Details
        <h3>{flight.attributes.origin_code} to {flight.attributes.destination_code}</h3>
        <h4>on {flight.attributes.start}</h4>
      </div>
      <form onSubmit={handleSubmit} >
        {passengersList}
        <input type="submit" value="book flight!"/>
      </form>
    </Fragment>
  )
}

export default Checkout

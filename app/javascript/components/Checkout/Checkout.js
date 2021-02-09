import React, { useState, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Passenger from './Passenger'

const Button = styled.div`
  margin: 10px auto;
  padding: 10px 20px;
  width: 100px;

  background: #fca311; /* orange */
  border: 1px solid #fca311; /* orange */
  border-radius: 4px;
  color: white;

  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #fff; /* orange */
    border: 1px solid #fca311; /* orange */
    color: #fca311; /* orange */
  }
`

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
        <Button onClick={handleSubmit}>Book Flight</Button>
      </form>
    </Fragment>
  )
}

export default Checkout

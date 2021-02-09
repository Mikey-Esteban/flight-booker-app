import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import Passenger from './Passenger'

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`
const FlightDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 200px;

  background: #003049; /* dark blue */
  border-radius: 10px;
  color: #fff;
  font-size: 20px;

  h2 {
    font-weight: 200;
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 5px;
  }
`

const FormWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const PassengersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`

const Button = styled.div`
  margin: 10px auto;
  padding: 10px 20px;
  width: 100px;

  background: #d62828; /* red */
  border: 1px solid #d62828; /* red */
  border-radius: 4px;
  color: white;

  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #fff;
    border: 1px solid #d62828; /* red */
    color: #d62828; /* red */
  }
`

const Checkout = (props) => {

  const flights = props.location.state.flights
  const numTickets = props.location.state.tickets
  const flight = flights[0]
  const passengers = []
  const [ redirect, setRedirect ] = useState(false)
  const [ booking, setBooking ] = useState({})
  const [ bookingPassengers, setBookingPassengers ] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(passengers);

    const bookingData = {
      flight_id: flight.id,
      passengers: passengers
    }

    axios.post('/api/v1/bookings', {booking: bookingData})
      .then( resp => {
        setBooking(resp.data.data)
        setBookingPassengers(resp.data.included)
        setRedirect(true)
      })
      .catch( resp => console.log(resp))
  }

  const passengersList = []
  for (let i=0; i < numTickets; i++) {
    passengers.push({})
    passengersList.push(<Passenger passengers={passengers} id={i} key={i} />)
  }

  if (redirect) {
    return (
      <Redirect to={{
          pathname: `/bookings/${booking.id}`,
          state: {
            booking: booking,
            passengers: bookingPassengers,
            flight: flight
          }
        }}
      />
    )
  }

  return (
    <Wrapper>
      <div>[Checkout component, look up props in console]</div>
      <FlightDetails>
        <h2>Flight Details</h2>
        <h3>
          {flight.attributes.origin_code} to {flight.attributes.destination_code}
        </h3>
        <h4>on {flight.attributes.start}</h4>
      </FlightDetails>
      <FormWrapper>
        <form onSubmit={handleSubmit} >
          <PassengersWrapper>
            {passengersList}
          </PassengersWrapper>
          <Button onClick={handleSubmit}>Book Flight</Button>
        </form>
      </FormWrapper>
    </Wrapper>
  )
}

export default Checkout

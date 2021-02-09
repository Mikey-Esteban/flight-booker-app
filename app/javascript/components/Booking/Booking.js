import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #003049; /* dark blue */
  border-radius: 10px;
  color: #fff;
  font-size: 20px;

  h2 {
    font-weight: 200;
    margin-bottom: 10px;
  }
`

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`

const CardWrapper = styled.div`
  margin-bottom: 20px;
`

const Card = styled.div`
  border: none;
  border-radius: 4px;
  padding: 10px;

  background: #fff;
  color: black;
  font-size: 14px;
`

const Booking = (props) => {
  console.log(props);
  const flight = props.location.state.flight
  const passengers = props.location.state.passengers

  const passengersList = passengers.map(passenger => {
    return(
      <div key={passenger.id}>
        <p>{passenger.attributes.name} {passenger.attributes.email}</p>
      </div>
    )
  })

  return (
    <Wrapper>
      <h2>Your flight is booked!</h2>
      <BookingDetails>
        <CardWrapper>
          <p>Flight</p>
          <Card>
            <p>{flight.attributes.origin_code} to {flight.attributes.destination_code}</p>
            <p>{flight.attributes.start}</p>
          </Card>
        </CardWrapper>
        <CardWrapper>
          <p>Passengers</p>
          <Card>
            {passengersList}
          </Card>
        </CardWrapper>
      </BookingDetails>
    </Wrapper>
  )
}

export default Booking

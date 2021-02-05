import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Flight from './Flights/Flight'

const FlightsWrapper = styled.div`
  .row:nth-of-type(even) {
    background: #f2e9e4;
  }
`

const Home = () => {

  const [ flights, setFlights ] = useState([])

  useEffect( () => {
    axios.get('/api/v1/flights')
      .then( resp => {
        setFlights(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [])

  const flightsList = flights.map( item => <Flight key={item.id} attributes={item.attributes} /> )

  return (
    <Fragment>
      <div>[My Home Component]</div>
      <FlightsWrapper>
        {flightsList}
      </FlightsWrapper>
    </Fragment>
  )
}

export default Home

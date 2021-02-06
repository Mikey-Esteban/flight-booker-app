import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Flight from './Flight'
import Dropdown from './Dropdown'

const FlightsWrapper = styled.div`
  .row:nth-of-type(even) {
    background: #f2e9e4; /* soft pink */
  }
`

const Flights = () => {

  const [ flights, setFlights ] = useState([])
  const [ fromLocation, setFromLocation ] = useState([])
  const [ toLocation, setToLocation ] = useState([])
  const [ travelDates, setTravelDates ] = useState([])

  useEffect( () => {
    axios.get('/api/v1/flights')
      .then( resp => {
        setFlights(resp.data.data)
        const datesArr = resp.data.data.map( item => item.attributes.start.split(' ')[1] )
        const uniqueDates = [...new Set(datesArr)]
        const datesData = uniqueDates.map( (date, index) => {
          return ({
            id: index,
            title: date,
            selected: false,
            key: 'travelDates'
          })
        })
        setTravelDates(datesData)
      })
      .catch(resp => console.log(resp))

    axios.get('/api/v1/airports')
      .then ( resp => {
        const airports = resp.data.data
        const toData = airports.map( airport => {
          return ({
              id: airport.id,
              title: airport.attributes.code,
              selected: false,
              key: 'toLocation'
          })
        })
        const fromData = airports.map( airport => {
          return ({
              id: airport.id,
              title: airport.attributes.code,
              selected: false,
              key: 'fromLocation'
          })
        })
        setToLocation(toData)
        setFromLocation(fromData)
      })
      .catch(resp => console.log(resp))
  }, [])

  const toggleSelected = (id, key) => {
    console.log('IN TOGGLE SELECTED..', key);
    if (key === 'toLocation') {
      toLocation.forEach( item => {
        item.id === id ? item.selected = true : item.selected = false ;
      })
    } else if (key === 'fromLocation') {
      fromLocation.forEach( item => {
        item.id === id ? item.selected = true : item.selected = false ;
      })
    } else {
      travelDates.forEach( item => {
        item.id === id ? item.selected = true : item.selected = false ;
      })
    }
  }

  const flightsList = flights.map( item => <Flight key={item.id} attributes={item.attributes} /> )

  return (
    <Fragment>
      <div>[My Home Component]</div>
      <Dropdown title='Select location' list={toLocation} toggleSelected={toggleSelected} />
      <Dropdown title='Select location' list={fromLocation} toggleSelected={toggleSelected} />
      <Dropdown title='Select date' list={travelDates} toggleSelected={toggleSelected} />
      <FlightsWrapper>
        {flightsList}
      </FlightsWrapper>
    </Fragment>
  )
}

export default Flights

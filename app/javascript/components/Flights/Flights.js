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
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  max-width: 600px;
  margin: 0 auto;
`

const Flights = () => {

  const [ flights, setFlights ] = useState([])
  const [ fromLocation, setFromLocation ] = useState([])
  const [ toLocation, setToLocation ] = useState([])
  const [ travelDates, setTravelDates ] = useState([])
  const [ passengers, setPassengers ] = useState([])

  useEffect( () => {
    // set Passengers dropdown data
    const passengers = []
    for (let i = 1; i < 5; i++) {
      const data = { id: i, title: i, selected: false, key: 'passengers' }
      passengers.push(data)
    }
    setPassengers(passengers)

    axios.get('/api/v1/flights')
      .then( resp => {
        setFlights(resp.data.data)
        // set Dates dropdown data
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

    // set toLocation & fromLocation dropdown data
    axios.get('/api/v1/airports')
      .then ( resp => {
        const airports = resp.data.data
        const keys = ['toLocation', 'fromLocation']
        for (let i = 0; i < 2; i++) {
          const data = airports.map( airport => {
            return ({
              id: airport.id,
              title: airport.attributes.code,
              selected: false,
              key: keys[i]
            })
          })
          i === 0 ? setToLocation(data) : setFromLocation(data) ;
        }
      })
      .catch(resp => console.log(resp))
  }, [])

  const toggleSelected = (id, key) => {
    const legend = {
      'toLocation': toLocation,
      'fromLocation': fromLocation,
      'passengers': passengers,
      'travelDates': travelDates
    }

    legend[key].forEach( item => {
      item.id === id ? item.selected = true : item.selected = false ;
    })
  }

  const flightsList = flights.map( item => <Flight key={item.id} attributes={item.attributes} /> )

  return (
    <Fragment>
      <div>[My Home Component]</div>
      <SearchWrapper>
        <DropdownWrapper>
          <Dropdown title='Select location' list={toLocation} toggleSelected={toggleSelected} />
        </DropdownWrapper>
        <DropdownWrapper>
          <Dropdown title='Select location' list={fromLocation} toggleSelected={toggleSelected} />
        </DropdownWrapper>
        <DropdownWrapper>
          <Dropdown title='Select date' list={travelDates} toggleSelected={toggleSelected} />
        </DropdownWrapper>
        <DropdownWrapper>
          <Dropdown title='Select passenger' list={passengers} toggleSelected={toggleSelected} />
        </DropdownWrapper>
      </SearchWrapper>
      <FlightsWrapper>
        {flightsList}
      </FlightsWrapper>
    </Fragment>
  )
}

export default Flights

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
  width: 600px;
  margin: 0 auto;
`

const DropdownsWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
`
const DropdownWrapper = styled.div`

`

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 10px auto;
  padding: 10px 0;
  width: 100px;

  background: #fca311; /* orange */
  border: 1px solid #fca311; /* orange */
  border-radius: 4px;
  color: white;

  cursor: pointer;
  text-align: center;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #fff; /* orange */
    border: 1px solid #fca311; /* orange */
    color: #fca311; /* orange */
  }
`

const BlueOutlineButton = styled(Button)`
  background: #fff;
  border: 1px solid #003049; /* dark blue */
  color: #003049;

  &:hover {
    background: #003049; /* dark blue */
    border: 1px solid #003049; /* dark blue */
    color: #fff;
  }
`

const Flights = () => {

  const [ flights, setFlights ] = useState([])
  const [ allFlights, setAllFlights ] = useState([])
  // dropdown value options
  const [ fromLocation, setFromLocation ] = useState([])
  const [ toLocation, setToLocation ] = useState([])
  const [ travelDates, setTravelDates ] = useState([])
  const [ passengers, setPassengers ] = useState([])
  // selected values
  const [ fromLocationValue, setFromLocationValue ] = useState()
  const [ toLocationValue, setToLocationValue ] = useState()
  const [ travelDatesValue, setTravelDatesValue ] = useState()
  const [ passengersValue, setPassengersValue ] = useState()

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
        setAllFlights(resp.data.data)
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
      'fromLocation': [fromLocation, setFromLocationValue],
      'toLocation': [toLocation, setToLocationValue],
      'passengers': [passengers, setPassengersValue],
      'travelDates': [travelDates, setTravelDatesValue]
    }

    legend[key][0].forEach( item => {
      if (item.id === id) {
        item.selected = true
        // update selected value
        legend[key][1](item.title)
      } else {
        item.selected = false
      }
    })
  }

  const handleSearch = () => {
    const data = {
      'from': fromLocationValue,
      'to': toLocationValue,
      'date': travelDatesValue,
      'passengers': passengersValue
    }

    axios.get('/api/v1/flights', { params: data })
      .then( resp => {
        console.log(resp.data.data);
        setFlights(resp.data.data)
      })
      .catch( resp => console.log(resp))
  }

  const handleReset = () => {
    setFlights(allFlights)
  }

  const flightsList = flights.map( item => <Flight key={item.id} attributes={item.attributes} /> )

  return (
    <Fragment>
      <div>[My Home Component]</div>
      <SearchWrapper>
        <DropdownsWrapper>
          <DropdownWrapper>
            <div className="label">Departing: </div>
            <Dropdown title='Select location' list={fromLocation} toggleSelected={toggleSelected} />
          </DropdownWrapper>
          <DropdownWrapper>
            <div className="label">Arriving: </div>
            <Dropdown title='Select location' list={toLocation} toggleSelected={toggleSelected} />
          </DropdownWrapper>
          <DropdownWrapper>
            <div className="label">Date: </div>
            <Dropdown title='Select date' list={travelDates} toggleSelected={toggleSelected} />
          </DropdownWrapper>
          <DropdownWrapper>
            <div className="label">Tickets: </div>
            <Dropdown title='Select passengers' list={passengers} toggleSelected={toggleSelected} />
          </DropdownWrapper>
        </DropdownsWrapper>
        <ButtonsWrapper>
          <Button onClick={handleSearch}>Search</Button>
          <BlueOutlineButton onClick={handleReset}>All Flights</BlueOutlineButton>
        </ButtonsWrapper>
      </SearchWrapper>
      <FlightsWrapper>
        {flightsList}
      </FlightsWrapper>
    </Fragment>
  )
}

export default Flights

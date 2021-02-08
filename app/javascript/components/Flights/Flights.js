import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Redirect }  from 'react-router'
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
  grid-template-columns: repeat(3, 1fr);
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 10px auto;
  padding: 10px 20px;
  ${'' /* width: 80px; */}

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

const RedOutlineButton = styled(Button)`
  background: #fff;
  border: 1px solid #d62828; /* red */
  color: #d62828;

  &:hover {
    background: #d62828; /* red */
    border: 1px solid #d62828; /* red */
    color: #fff;
  }
`

const Flights = () => {

  const [ flights, setFlights ] = useState([])
  const [ allFlights, setAllFlights ] = useState([])
  const [ selectedFlights, setSelectedFlights ] = useState([])
  const [ viewCheckout, setViewCheckout ] = useState(false)
  const [ redirect, setRedirect ] = useState(false)
  // dropdown value options
  const [ fromLocation, setFromLocation ] = useState([])
  const [ toLocation, setToLocation ] = useState([])
  const [ travelDates, setTravelDates ] = useState([])
  const [ tickets, setTickets ] = useState([])
  // selected values
  const [ fromLocationValue, setFromLocationValue ] = useState()
  const [ toLocationValue, setToLocationValue ] = useState()
  const [ travelDatesValue, setTravelDatesValue ] = useState()
  const [ ticketsValue, setTicketsValue ] = useState()

  useEffect( () => {
    // set Tickets dropdown data
    const tickets = []
    for (let i = 1; i < 5; i++) {
      const data = { id: i, title: i, selected: false, key: 'tickets' }
      tickets.push(data)
    }
    setTickets(tickets)

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
      'tickets': [tickets, setTicketsValue],
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

  const handleSelect = (flight) => {
    const input = event.target.previousSibling
    if (input.checked === true) {
      input.checked = false
      // remove flight from selected flights
      const updatedFlights = selectedFlights.filter( item => item.id !== flight.id)
      setSelectedFlights(updatedFlights)
      if (updatedFlights.length === 0) {
        setViewCheckout(false)
      }
    } else {
      input.checked = true
      setSelectedFlights([...selectedFlights, flight])
      setViewCheckout(true)
    }
  }

  const handleCheckout = () => {
    setRedirect(true)
  }

  const flightsList = flights.map( item => {
    return (<Flight key={item.id} flight={item} id={item.id} attributes={item.attributes} handleSelect={handleSelect} />)
  })

  if (redirect) {
    return (
      <Redirect to={{
        pathname: '/checkout',
        state: {
          flights: selectedFlights,
          tickets: ticketsValue
        }
      }} />
    )
  }

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
            <Dropdown title='Select tickets' list={tickets} toggleSelected={toggleSelected} />
          </DropdownWrapper>
        </DropdownsWrapper>
        <ButtonsWrapper>
          <Button onClick={handleSearch}>Search</Button>
          <BlueOutlineButton onClick={handleReset}>All Flights</BlueOutlineButton>
          { viewCheckout &&
            <RedOutlineButton onClick={handleCheckout}>Checkout</RedOutlineButton>
          }
        </ButtonsWrapper>
      </SearchWrapper>
      <FlightsWrapper>
        {flightsList}
      </FlightsWrapper>
    </Fragment>
  )
}

export default Flights

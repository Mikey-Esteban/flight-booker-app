import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Home = () => {

  const [ flights, setFlights ] = useState([])

  useEffect( () => {
    axios.get('/api/v1/flights')
      .then( resp => {
        debugger
        setFlights(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [])

  const flightsList = flights.map( item => {
    return(
      <div>
        <h3>Flight from: {item.attributes.origin_id} to: {item.attributes.destination_id}</h3>
        <p>Date: {item.attributes.start}</p>
        <p>Duration: {item.attributes.duration}min</p>
      </div>
    )
  })

  return (
    <Fragment>
      <div>[My Home Component]</div>
      {flightsList}
    </Fragment>
  )
}

export default Home

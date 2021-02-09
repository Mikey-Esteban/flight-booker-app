import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 25px auto;
  width: 300px;

  h4 {
    font-weight: 400;
  }
`

const Field = styled.div`
  margin: 10px auto;

  label, input {
    width: 100%;
  }

  input {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 5px 0 5px 10px;

    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
  }
`

const Passenger = (props) => {
  const { id, passengers } = props
  const [ passenger, setPassenger ] = useState({})

  const handleChange = (e) => {
    setPassenger({...passenger, [e.target.name]:e.target.value})
    console.log(passenger);
    passengers[id] = passenger
  }

  return (
    <Wrapper>
      <h4>Passenger {id+1}</h4>
      <Field>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
      </Field>

      <Field>
        <label htmlFor="email">Email address</label>
        <input type="text" name="email" onChange={handleChange} />
      </Field>
    </Wrapper>
  )
}

export default Passenger

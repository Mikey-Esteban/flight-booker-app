import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 25px auto;
  width: 200px;
`

const Field = styled.div`
  margin: 10px auto;

  label, input {
    width: 100%;
  }
`

const Passenger = (props) => {
  const { id, passengers } = props
  const [ passenger, setPassenger ] = useState({})

  const handleChange = (e) => {
    setPassenger({...passenger, [e.target.name]:e.target.value})
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

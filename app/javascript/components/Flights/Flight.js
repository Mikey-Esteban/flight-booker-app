import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;

  max-width: 600px;
  margin: 0 auto;

  border-bottom: 1px solid #efefef;
`

const Column = styled.div`
  display: flex;
  align-items: baseline;

  h4 {
    color: #1d3557; /* dark blue */
  }

  p {
    margin-left: 10px;
    font-size: 14px;
  }
`
const Bold = styled.p`
  color: #1d3557;
`

const Flight = (props) => {
  return (
    <Row className="row">
      <Column>
        <h4>Flight:</h4>
        <p>{props.attributes.origin_code} to {props.attributes.destination_code}</p>
      </Column>
      <Column>
        <h4>Date:</h4>
        <p>{props.attributes.start}</p>
      </Column>
      <Column>
        <h4>Duration:</h4>
        <p>{props.attributes.duration}m</p>
      </Column>
    </Row>
  )
}

export default Flight

import React from 'react'
import styled from 'styled-components'

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 5px;
  left: 0;
  width: 28px;
  height: 18px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 28px;
  height: 18px;
  &:checked + ${CheckBoxLabel} { /*  */
    background: #003049; /* dark blue */
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin-left: 14px;
      transition: 0.2s;
    }
  }
`
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;

  max-width: 700px;
  margin: 0 auto;

  border-bottom: 1px solid #efefef;
`

const Column = styled.div`
  display: flex;
  align-items: baseline;

  h4 {
    color: #1d3557; /* dark blue */
    font-weight: 400;
  }

  p {
    margin-left: 10px;
    font-size: 14px;
  }
`
const Bold = styled.p`
  color: #1d3557; /* dark blue */
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
      <Column>
        <CheckBoxWrapper id={props.id} onClick={(event) => props.handleSelect(props.flight) }>
          <CheckBox type="checkbox" />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
      </Column>
    </Row>
  )
}

export default Flight

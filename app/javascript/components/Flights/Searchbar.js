import React from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown'

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
const Searchbar = (props) => {
  const { fromLocation, toLocation, travelDates, tickets } = props
  const { toggleSelected, handleSearch, handleReset, viewCheckout, handleCheckout } = props

  return (
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
  )
}

export default Searchbar

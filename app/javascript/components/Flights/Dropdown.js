import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'

const DropdownWrapper = styled.div`
  width: 150px;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #fff;
  border: 1px solid #efefef;
  width: 100%;

  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;

  &:hover {
    background: #efefef;
  }
`

const TitleWrapper = styled.div`
  color: #1d3557; /* dark blue */
  margin-left: 20px;
`

const IconWrapper = styled.div`
  margin-right: 20px;
`

const Dropdown = (props) => {
  // console.log('Dropdown', props);
  const list = props.list
  const [ headerTitle, setHeaderTitle ] = useState(props.title)
  const [ isListOpen, setIsListOpen ] = useState(false)

  const toggleList = () => {
    isListOpen ? setIsListOpen(false) : setIsListOpen(true) ;
  }

  const handleClick = (item) => {
    const { title, id, key } = item

    setHeaderTitle(title)
    setIsListOpen(false)
    props.toggleSelected(id, key)
  }

  return (
    <DropdownWrapper>
      <Button
        type="button"
        className="dd-header"
        onClick={toggleList}
      >
        <TitleWrapper>{headerTitle}</TitleWrapper>
        <IconWrapper>
          {isListOpen
            ? <FontAwesomeIcon icon={faAngleUp} color="#8d99ae" />
            : <FontAwesomeIcon icon={faAngleDown} color="#8d99ae" />}
        </IconWrapper>
      </Button>
      {isListOpen && (
        <div
          role="list"
          className="dd-list"
        >
          {list.map((item) => (
            <Button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <TitleWrapper>{item.title}</TitleWrapper>
              {' '}
              <IconWrapper>{item.selected && <FontAwesomeIcon icon={faCheck} color="#8d99ae" />}</IconWrapper>
            </Button>
          ))}
        </div>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown

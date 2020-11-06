import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = props => {
  if (props.link) {
    return (
      <a href={props.link}>
        <StyledButton type={props.buttonType}>{props.text}</StyledButton>
      </a>
    )
  }
  return (
    <StyledButton type={props.buttonType} onClick={props.method}>
      {props.text}
    </StyledButton>
  )
}

Button.defaultProps = {
  buttonType: 'button'
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  buttonType: PropTypes.string,
  link: PropTypes.string,
  method: function (props, propName) {
    if (
      !props.link &&
      props.buttonType !== 'submit' &&
      (props[propName] == undefined || typeof props[propName] != 'function')
    ) {
      return new Error('Please provide a method function!')
    }
  }
}

const StyledButton = styled.button`
  background: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border: none;
  color: black;
  padding: 15px 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: blue;
`

export default Button

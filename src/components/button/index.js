import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = props => {
  const content = props.children || props.text
  if (props.link) {
    return (
      <a href={props.link}>
        <StyledButton type={props.buttonType}>{content}</StyledButton>
      </a>
    )
  }
  return (
    <StyledButton type={props.buttonType} onClick={props.method}>
      {content}
    </StyledButton>
  )
}

Button.defaultProps = {
  buttonType: 'button'
}

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
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
  color: white;
  padding: 15px 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: ${props => props.theme.primary};
`

export default Button

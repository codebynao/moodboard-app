import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Input = ({ value, setValue, inputType, inputId, label }) => {
  const input = (
    <StyledInput
      id={inputId}
      type={inputType}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
  if (label) {
    return (
      <div>
        <StyledLabel htmlFor={inputId}>{label}</StyledLabel>
        {input}
      </div>
    )
  }
  return input
}

Input.defaultProps = {
  value: '',
  inputType: 'text'
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string
}

const StyledLabel = styled.label`
  margin-bottom: 35px;
`

const StyledInput = styled.input`
  display: block;
  margin: 10px 0 20px;
  padding: 5px 2px;
  background: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border: none;
  border-bottom: black solid 1px;
  width: 100%;
  &:focus {
    outline: none;
  }
`

export default Input

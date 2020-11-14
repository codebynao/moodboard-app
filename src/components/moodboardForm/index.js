import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Button from '../../components/button'
import Input from '../../components/input'

const MoodboardForm = ({ name, setName, method }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleForm = event => {
    event.preventDefault()
    if (!name.trim().length) {
      setErrorMessage('A moodboard name cannot be empty')
      return
    }
    setErrorMessage('')
    method()
  }

  return (
    <Container>
      <StyledForm onSubmit={handleForm}>
        <Input
          type='text'
          value={name}
          setValue={setName}
          inputId='moodboard'
          placeholder='Create a new moodboard...'
        />
        <Button buttonType='submit' text='+ New' />
      </StyledForm>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  )
}

MoodboardForm.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  method: PropTypes.func.isRequired
}

const Container = styled.div`
  position: relative;
`

const StyledForm = styled.form`
  background-color: white;
  display: flex;
  justify-items: stretch;
  margin: 25px 0;
  input {
    flex-grow: 1;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.mediumGrey};
    margin-right: 15px;
  }

  button {
    padding: 10px 15px;
  }
`

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -33px;
  font-size: 12px;
  color: #b04141;
`

export default MoodboardForm

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

// Components
import Input from '../input'
import Button from '../button'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    setErrorMessage('')
    axios
      .post(process.env.REACT_APP_LOGIN_URL, { username, password })
      .then(response => {
        const token = response.headers['x-access-token']
        if (token) {
          localStorage.setItem('userToken', token)
          setShouldRedirect(true)
        } else {
          setErrorMessage('Invalid login. Try again.')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  if (shouldRedirect) {
    return <Redirect to='/feed' />
  }

  return (
    <div className='login'>
      <h1>Hello again!</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            inputType='text'
            inputId='username'
            value={username}
            setValue={setUsername}
            label='Username'
          />
        </InputGroup>
        <InputGroup>
          <Input
            inputType='password'
            inputId='password'
            value={password}
            setValue={setPassword}
            label='Password'
          />
        </InputGroup>
        <Button buttonType='submit' text='Enter' />
        <p>{errorMessage}</p>
      </Form>
    </div>
  )
}

const InputGroup = styled.div`
  display: block;
  text-align: left;
  padding-bottom: 30px;
`
const Form = styled.form`
  padding: 20px 10px;
  input {
    display: block;
    width: 100%;
    border-bottom: solid black 1px;
    padding-top: 15px;
  }
  button {
    border-radius: 5px;
  }
`

export default LoginForm

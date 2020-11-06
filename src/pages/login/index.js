import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import LoginForm from '../../components/loginForm'
import { isUserAuthenticated } from '../../utils/auth'

function Login() {
  if (isUserAuthenticated()) {
    return <Redirect to='/feed' />
  }

  return (
    <div>
      <StyledFormContainer>
        <LoginForm />
      </StyledFormContainer>
    </div>
  )
}

const StyledFormContainer = styled.div`
  background-color: rgba(27, 9, 46, 0.5);
  max-height: 60vh;
  width: 80vw;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export default Login

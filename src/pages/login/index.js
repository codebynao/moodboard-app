import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

// Assets
import Logo from '../../assets/images/logo_moodboard.png'

// Component
import LoginForm from '../../components/loginForm'

// Utils
import { isUserAuthenticated } from '../../utils/auth'

function Login() {
  if (isUserAuthenticated()) {
    return <Redirect to='/feed' />
  }

  return (
    <div>
      <StyledFormContainer>
        <img src={Logo} alt='logo' width='110px' height='auto' />
        <LoginForm />
      </StyledFormContainer>
    </div>
  )
}

const StyledFormContainer = styled.div`
  max-height: 80vh;
  width: 80vw;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    margin-bottom: 30px;
  }
`

export default Login

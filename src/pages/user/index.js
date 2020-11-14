import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

// Components
import Button from '../../components/button'
import UserPhotoTabs from '../../components/userPhotoTabs'

const User = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const logout = () => {
    localStorage.removeItem('userToken')
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Header>
        <Button text='Logout' method={logout} />
      </Header>
      <UserPhotoTabs />
    </div>
  )
}

const Header = styled.div`
  text-align: right;
  padding: 5px 7px;
  margin-bottom: 15px;
`

export default User

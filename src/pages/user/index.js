import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

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
      <Button text='Logout' method={logout} />
      <UserPhotoTabs />
    </div>
  )
}

export default User

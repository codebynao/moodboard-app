import React from 'react'
import Router from '../config/router'

function App() {
  return (
    <div className='App'>
      <div className='alert-offline'>Oops.. Seems like you are offline...</div>
      <Router />
    </div>
  )
}

export default App

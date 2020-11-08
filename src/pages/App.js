import React from 'react'
import Router from '../config/router'
import styled from 'styled-components'

function App() {
  return (
    <StyledApp className='App'>
      <Router />
    </StyledApp>
  )
}

const StyledApp = styled.div`
  height: 100%;
  background-color: ${props => props.theme.lightGrey};
`

export default App

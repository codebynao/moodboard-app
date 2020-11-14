import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
    <StyledLoader>
      <span></span>
      <span></span>
      <span></span>
    </StyledLoader>
  )
}

const StyledLoader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${props => props.theme.primary};
    margin: 35px 5px;
    opacity: 0;
  }
  span:nth-child(1) {
    animation: opacitychange 1s ease-in-out infinite;
  }

  span:nth-child(2) {
    animation: opacitychange 1s ease-in-out 0.33s infinite;
  }

  span:nth-child(3) {
    animation: opacitychange 1s ease-in-out 0.66s infinite;
  }

  @keyframes opacitychange {
    0%,
    100% {
      opacity: 0;
    }

    60% {
      opacity: 1;
    }
  }
`

export default Loader

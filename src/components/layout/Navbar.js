import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// Icons
import { Home, User } from 'react-feather'

const Navbar = () => {
  return (
    <StyledNavbar className='navbar'>
      <StyledLink to='/feed' exact>
        <Home />
      </StyledLink>
      <StyledLink to='/user'>
        <User />
      </StyledLink>
    </StyledNavbar>
  )
}

const StyledLink = styled(NavLink)`
  text-decoration: none;
  flex: 1;
  padding: 15px 0;
  color: ${props => props.theme.mediumGrey};
  svg {
    stroke-width: 1px;
    width: 24px;
    height: 24px;
  }
  &.active {
    color: ${props => props.theme.primary};
    svg {
      stroke-width: 2px;
    }
  }
`
const StyledNavbar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  text-align: center;
  background-color: white;
  border-top: 1px solid ${props => props.theme.lightGrey};
`

export default Navbar

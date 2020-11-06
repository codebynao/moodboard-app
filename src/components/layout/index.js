import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <>
      <div className='layout'>
        <StyledMain>{children}</StyledMain>
        <Navbar />
      </div>
    </>
  )
}

Layout.propTypes = { children: PropTypes.node.isRequired }

const StyledMain = styled.main`
  padding-bottom: 105px;
`
export default Layout

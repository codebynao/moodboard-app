import React from 'react'

import Navbar from './Navbar'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <>
      <div className='layout'>
        <main>{children}</main>
        <Navbar />
      </div>
    </>
  )
}

Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout

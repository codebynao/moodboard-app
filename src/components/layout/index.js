import React from 'react'

import Header from './Header'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <>
      <div className='layout'>
        <Header title='PexelsLike' />
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout

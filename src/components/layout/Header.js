import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ title }) => {
  return (
    <header className='header'>
      <p>{title}</p>
      <Link to='/'>Home</Link>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header

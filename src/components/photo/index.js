import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Photo = ({ src, alt }) => {
  return <StyledPhoto src={src} alt={alt} />
}

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}

const StyledPhoto = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
  border: none;
  padding: 0;
`

export default Photo

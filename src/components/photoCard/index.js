import React from 'react'
import styled from 'styled-components'

// Components
import Photo from '../photo'
import PhotoDetails from '../photoDetails'

// Config
import { photoType } from '../../config/propTypesSchemas'

const PhotoCard = ({ photo }) => {
  return (
    <Container>
      <Photo src={photo.src} alt={photo.photographer} />
      <PhotoDetails photo={photo} />
    </Container>
  )
}

PhotoCard.propTypes = photoType

const Container = styled.div`
  font-size: 0;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 5px;
  }
  div {
    font-size: 1rem;
  }
`

export default PhotoCard

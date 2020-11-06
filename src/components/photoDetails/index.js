import React from 'react'
import styled from 'styled-components'

// Components
import PhotoActions from '../photoActions'

// Config
import { photoType } from '../../config/propTypesSchemas'

const PhotoDetails = ({ photo }) => {
  return (
    <Container>
      <span>
        By <i>{photo.photographer}</i>
      </span>
      <PhotoActions photo={photo} />
    </Container>
  )
}

PhotoDetails.propTypes = photoType

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 15px 10px;
  margin: 0;
  border: none;
  * {
    flex: 1;
  }
`

export default PhotoDetails

import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'

// Components
import { Heart, PlusCircle } from 'react-feather'

// Config
import { photoType } from '../../config/propTypesSchemas'

// Utils
import { handleFavorite, isFavorited } from '../../utils/photo'

const PhotoActions = ({ photo, theme }) => {
  const [favoritedStatus, setFavoritedStatus] = useState(isFavorited(photo.id))
  let filled = favoritedStatus ? theme.mediumGrey : 'none'
  const handlePhotoFavorite = photo => {
    handleFavorite(photo)
    setFavoritedStatus(!favoritedStatus)
  }

  return (
    <Container>
      <PlusCircle />
      <Heart onClick={() => handlePhotoFavorite(photo)} fill={filled} />
    </Container>
  )
}

PhotoActions.propTypes = photoType

const Container = styled.div`
  display: inline-block;
  text-align: right;
  svg {
    padding: 0 10px;
    stroke-width: 1px;
    color: ${props => props.theme.mediumGrey};
  }
`

export default withTheme(PhotoActions)
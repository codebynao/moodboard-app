import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'

// Components
import { Heart, PlusCircle } from 'react-feather'
import MoodboardModal from '../moodboardModal'

// Config
import { photoType } from '../../config/propTypesSchemas'

// Utils
import { handleFavorite, isFavorited } from '../../utils/favorites'

const PhotoActions = ({ photo, theme }) => {
  const [favoritedStatus, setFavoritedStatus] = useState(isFavorited(photo.id))
  const [filled, setFilled] = useState('none')
  const [border, setBorder] = useState(theme.mediumGrey)
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const handlePhotoFavorite = photo => {
    handleFavorite(photo)
    setFavoritedStatus(!favoritedStatus)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    setFavoritedStatus(isFavorited(photo.id))
    setBorder(favoritedStatus ? theme.primary : theme.mediumGrey)
    setFilled(favoritedStatus ? theme.primary : 'none')
  })

  return (
    <Container id={photo.id}>
      <MoodboardModal
        photo={photo}
        isOpen={modalIsOpen}
        closeModal={closeModal}
      />
      <PlusCircle onClick={() => setIsOpen(true)} />
      <Heart
        onClick={() => handlePhotoFavorite(photo)}
        fill={filled}
        color={border}
      />
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

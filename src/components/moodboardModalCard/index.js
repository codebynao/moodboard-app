import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import MoodboardCardCover from '../moodboardCardCover'

// Config
import { photoType } from '../../config/propTypesSchemas'

// Utils
import {
  getMoodboard,
  handleMoodboardPhoto,
  isInMoodboard
} from '../../utils/moodboards'

const MoodboardModalCard = ({ moodboard, photo }) => {
  const [coverPhoto, setCoverPhoto] = useState({})
  const [inMoodboard, setInMoodboard] = useState(false)

  useEffect(() => {
    if (moodboard.photos && moodboard.photos.length) {
      setCoverPhoto(moodboard.photos.slice().reverse()[0])
      setInMoodboard(isInMoodboard(photo.id, moodboard.name))
      return
    }
  }, [moodboard])

  const handleImageInMoodboard = () => {
    handleMoodboardPhoto(photo, moodboard.name)
    const updatedMoodboard = getMoodboard(moodboard.name)
    setCoverPhoto(updatedMoodboard.photos.slice().reverse()[0])
    setInMoodboard(isInMoodboard(photo.id, moodboard.name))
  }

  return (
    <div>
      <MoodboardCardCover
        photo={coverPhoto}
        width='36vw'
        height='16vh'
        selected={inMoodboard}
        method={handleImageInMoodboard}
      />
      <Name>{moodboard.name}</Name>
    </div>
  )
}

MoodboardModalCard.propTypes = {
  moodboard: PropTypes.object.isRequired,
  ...photoType
}

const Name = styled.p`
  margin: 0;
  text-transform: capitalize;
  padding-bottom: 4px;
`

export default MoodboardModalCard

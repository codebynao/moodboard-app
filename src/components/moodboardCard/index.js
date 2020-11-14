import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Images
import NoImage from '../../assets/images/no-image-placeholder.jpg'

const MoodboardCard = ({ moodboard }) => {
  const [mainCoverPhoto, setMainCoverPhoto] = useState({})
  const [coverPhotos, setCoverPhotos] = useState([])

  useEffect(() => {
    if (moodboard.photos && moodboard.photos.length) {
      const reversedPhotosList = moodboard.photos.slice().reverse()
      setMainCoverPhoto(reversedPhotosList[0])
      setCoverPhotos(reversedPhotosList.slice(1, 4))
      return
    }
    setMainCoverPhoto({ src: NoImage })
  }, [])
  return (
    <Container>
      <Name>{moodboard.name}</Name>
      <CoverImage>
        <img src={mainCoverPhoto.src} />
      </CoverImage>
      <CoverPreview>
        {coverPhotos.map(photo => (
          <div key={photo.id}>
            <img src={photo.src} />
          </div>
        ))}
      </CoverPreview>
    </Container>
  )
}

MoodboardCard.propTypes = {
  moodboard: PropTypes.object.isRequired
}

const Container = styled.div`
  padding-top: 10px;
`

const Name = styled.p`
  margin: 0;
  text-transform: capitalize;
  padding-bottom: 4px;
`
const CoverImage = styled.div`
  width: 46vw;
  height: 46vw;
  padding-bottom: 5px;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const CoverPreview = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;

  div {
    margin: auto;
    background-color: #000;
    width: 14vw;
    height: 7vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export default MoodboardCard

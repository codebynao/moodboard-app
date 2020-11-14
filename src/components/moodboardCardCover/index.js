import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Icons
import { Check } from 'react-feather'

// Images
import NoImage from '../../assets/images/no-image-placeholder.jpg'

const MoodboardCardCover = ({ photo, width, height, selected, method }) => {
  const [imageSrc, setImageSrc] = useState(NoImage)
  useEffect(() => {
    if (photo && photo.src) {
      setImageSrc(photo.src)
    } else {
      setImageSrc(NoImage)
    }
  }, [photo])
  return (
    <div>
      <Cover width={width} height={height} onClick={method}>
        <img src={imageSrc} />
        <SelectedOverlay selected={selected}>
          <Check />
        </SelectedOverlay>
      </Cover>
    </div>
  )
}

MoodboardCardCover.propTypes = {
  photo: PropTypes.object.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  selected: PropTypes.bool,
  method: PropTypes.func
}

const Cover = styled.div`
  width: ${props => props.width || '40vw'};
  height: ${props => props.height || '40vh'};
  margin: auto;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const SelectedOverlay = styled.div`
  background: ${props => props.theme.primary};
  height: 100%;
  width: 100%;
  opacity: ${props => (props.selected ? 0.7 : 0)};
  top: 0;
  left: 0;
  position: absolute;
  padding: 0;
  transition: opacity 0.5s;
  display: flex;
  svg {
    margin: auto;
    display: block;
    stroke-width: 2px;
    width: 32px;
    height: 32px;
    color: #fff;
  }
`
export default MoodboardCardCover

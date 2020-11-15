import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter, NavLink } from 'react-router-dom'
import styled from 'styled-components'

// components
import Button from '../../components/button'
import PhotosList from '../../components/photosList'
import { ArrowLeft } from 'react-feather'

// Utils
import { getMoodboard, removeMoodboard } from '../../utils/moodboards'

const MoodboardDetails = props => {
  if (!props.match.params.slug) {
    return <Redirect to='/user' />
  }

  const [moodboard, setMoodboard] = useState({})
  const [photos, setPhotos] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    const moodboardFound = getMoodboard(props.match.params.slug.toLowerCase())

    if (!moodboardFound) {
      return <Redirect to='/user' />
    }

    setMoodboard(moodboardFound)

    if (moodboardFound.photos) {
      setPhotos(moodboardFound.photos.reverse())
    } else {
      setPhotos([])
    }
  }, [])

  const deleteMoodboard = () => {
    removeMoodboard(moodboard.slug)
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to='/user' />
  }

  return (
    <Container>
      <StyledNavLink to='/user'>
        <ArrowLeft />
        <span>Go back</span>
      </StyledNavLink>
      <Header>
        <h3>{moodboard.name}</h3>
        <Button text='Delete' method={deleteMoodboard} />
      </Header>
      <PhotosList list={photos} hasMore={false} />
    </Container>
  )
}

MoodboardDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  })
}

const Container = styled.div`
  a {
    text-decoration: none;
  }
`

const StyledNavLink = styled(NavLink)`
  padding: 15px 10px 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  position: relative;
  z-index: 1070;
  background: transparent;
  border: none;
  text-decoration: none;
  color: ${props => props.theme.text};
  margin-bottom: 15px;
  svg {
    width: 16px;
    height: 16px;
    padding-right: 4px;
  }
`

const Header = styled.div`
  display: flex;
  padding: 0 10px;
  *:last-child {
    margin-left: auto;
  }
  button {
    padding: 5px 15px;
    margin: 10px 0;
  }
`

export default withRouter(MoodboardDetails)

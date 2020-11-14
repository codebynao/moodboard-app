import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// components
import MoodboardCard from '../moodboardCard'

const MoodboardsList = ({ list }) => {
  if (!list.length) {
    return (
      <p>
        You don&apos;t have any moodboards yet... Browse images to start
        creating a moodboard
      </p>
    )
  }
  return (
    <Container>
      {list.map((moodboard, index) => (
        <MoodboardCard moodboard={moodboard} key={index} />
      ))}
    </Container>
  )
}

MoodboardsList.propTypes = {
  list: PropTypes.array.isRequired
}

const Container = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(2, 1fr);
`

export default MoodboardsList

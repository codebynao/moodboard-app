import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// components
import MoodboardCard from '../moodboardCard'
import MoodboardModalCard from '../moodboardModalCard'

const MoodboardsList = ({ list, isModal, photo }) => {
  if (!list.length) {
    return <p>You don&apos;t have any moodboards yet...</p>
  }
  const Card = isModal ? MoodboardModalCard : MoodboardCard
  return (
    <Container>
      {list.map((moodboard, index) => (
        <Card moodboard={moodboard} key={index} photo={photo} />
      ))}
    </Container>
  )
}
MoodboardsList.defaultProps = {
  isModal: false
}

MoodboardsList.propTypes = {
  list: PropTypes.array.isRequired,
  isModal: PropTypes.bool,
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired
  })
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Modal from 'react-modal'
import MoodboardForm from '../moodboardForm'
import MoodboardsList from '../moodboardsList'
import Photo from '../photo'

// Config
import { photoType } from '../../config/propTypesSchemas'

// Utils
import { createMoodBoard } from '../../utils/photo'

const MoodboardModal = ({ photo, isOpen, closeModal }) => {
  Modal.setAppElement('body')

  const [moodboards, setMoodboards] = useState([])
  const [newName, setNewName] = useState('')

  const customModalStyle = {
    content: {
      top: 'none',
      left: '0',
      right: '0',
      bottom: '0',
      border: 'none',
      padding: '10px 30px 30px',
      minHeight: '30vh',
      maxHeight: '70vh',
      overflow: 'scroll'
    }
  }

  useEffect(() => {
    if (localStorage.getItem('moodboards')) {
      const list = JSON.parse(localStorage.getItem('moodboards'))
      setMoodboards(list.reverse())
    }
  }, [isOpen])

  const addNewMoodBoard = () => {
    const newList = createMoodBoard(photo, newName)
    setMoodboards(newList.reverse())
    setNewName('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyle}
      contentLabel='Add to moodboard'
    >
      <h3>Save to moodboard</h3>
      <Photo src={photo.src} alt={photo.photographer} />
      <MoodboardForm
        name={newName}
        setName={setNewName}
        method={addNewMoodBoard}
      />
      <ListTitle>Existing moodboards</ListTitle>
      <MoodboardsList list={moodboards} isModal={true} photo={photo} />
    </Modal>
  )
}

MoodboardModal.propTypes = {
  ...photoType,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

const ListTitle = styled.p`
  padding-top: 8px;
  font-size: 15px;
`

export default MoodboardModal

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Components
import Modal from 'react-modal'
import Photo from '../photo'
import Select from '../select'

// Config
import { photoType } from '../../config/propTypesSchemas'

const MoodboardModal = ({ photo, isOpen, closeModal }) => {
  Modal.setAppElement('body')

  const [moodboards, setMoodboards] = useState([])
  const [selectOptions, setSelectOptions] = useState([])

  const customModalStyle = {
    content: {
      top: 'none',
      left: '0',
      right: '0',
      bottom: '0',
      border: 'none',
      padding: '10px 30px 30px',
      minHeight: '30vh',
      overflow: 'scroll'
    }
  }

  useEffect(() => {
    if (localStorage.getItem('moodboards')) {
      const list = JSON.parse(localStorage.getItem('moodboards'))
      setMoodboards(list)
      setSelectOptions(
        list.map(moodboard => formatSelectOption(moodboard.name))
      )
    }
  }, [isOpen])

  const formatSelectOption = option => {
    return {
      value: option,
      label: option
    }
  }

  const createMoodboard = name => {
    const newMoodboard = {
      name,
      photos: [photo]
    }
    const newList = [...moodboards, newMoodboard]

    setMoodboards(newList)
    setSelectOptions(
      newList.map(moodboard => formatSelectOption(moodboard.name))
    )

    localStorage.setItem('moodboards', JSON.stringify(newList))
  }

  const updateMoodboard = name => {
    const moodboard = moodboards.find(item => item.name === name)
    if (!moodboard) {
      createMoodboard(name)
      return
    }

    if (moodboard.photos.some(item => item.id === photo.id)) {
      return
    }
    moodboard.photos.push(photo)
    localStorage.setItem('moodboards', JSON.stringify(moodboards))
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyle}
      contentLabel='Add to moodboard'
    >
      <p>Save to moodboard</p>
      <Photo src={photo.src} alt={photo.photographer} />
      <Select options={selectOptions} update={updateMoodboard} />
    </Modal>
  )
}

MoodboardModal.propTypes = {
  ...photoType,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default MoodboardModal

import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import PhotoCard from '../../components/photoCard'

// Utils
import { formatPhotoObj } from '../../utils/photo'

function Feed() {
  const [list, setList] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/curated`,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
      .then(result => {
        setList(result.data.photos)
      })
      .catch(error => console.error(error))
  }, [])
  if (list && list.length) {
    localStorage.setItem('photos', JSON.stringify(list))
  } else if (!list.length && localStorage.getItem('photos')) {
    setList(JSON.parse(localStorage.getItem('photos')))
  }

  return (
    <div className='feed'>
      {list.map(photo => (
        <div key={photo.id}>
          <PhotoCard photo={formatPhotoObj(photo)} />
        </div>
      ))}
      <a href='https://www.pexels.com'>Photos provided by Pexels</a>
    </div>
  )
}

export default Feed

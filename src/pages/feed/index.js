import React, { useState, useEffect } from 'react'

// API
import { getPhotosFeed } from '../../api/photo'

// Components
import PhotosList from '../../components/photosList'

function Feed() {
  const [currentPage, setCurrentPage] = useState(1)
  const [list, setList] = useState([])
  const getList = () => {
    getPhotosFeed(currentPage).then(photos => {
      if (currentPage === 1) {
        setList(photos)
      } else {
        setList(list.concat(photos))
      }
      setCurrentPage(currentPage + 1)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  // Let's only save in the localStorage the 45 first photos (= 3 pages)
  if (list && list.length < 50) {
    localStorage.setItem('photos', JSON.stringify(list))
  } else if (!list.length && localStorage.getItem('photos')) {
    setList(JSON.parse(localStorage.getItem('photos')))
  }

  return (
    <div className='feed'>
      <PhotosList list={list} fetchData={getList} />
      <a href='https://www.pexels.com'>Photos provided by Pexels</a>
    </div>
  )
}

export default Feed

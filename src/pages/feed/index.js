import React, { useState, useEffect } from 'react'

// API
import { getPhotosFeed, searchPhotos } from '../../api/photo'

// Components
import PhotosList from '../../components/photosList'
import SearchForm from '../../components/searchForm'

function Feed() {
  const [currentPage, setCurrentPage] = useState(1)
  const [list, setList] = useState([])
  const [query, setQuery] = useState('')

  const getList = () => {
    // If no query, get the main feed
    if (!query.length) {
      getPhotosFeed(currentPage).then(photos => {
        updateStateList(photos)
      })
      return
    }
    // Otherwise, search photos matching the query
    searchPhotos(query, currentPage).then(photos => {
      updateStateList(photos)
    })
  }

  const updateStateList = photos => {
    /**
     * If we are back at page 1, it means that we fetched a new list
     * So let's replace the old one.
     * Otherwise, let's add the new photos to the current list
     */
    if (currentPage === 1) {
      setList(photos)
    } else {
      setList(list.concat(photos))
    }
    setCurrentPage(currentPage + 1)
  }

  /**
   * Updating the query also reset the current page number to avoid mixing
   * photos lists matching different queries
   */
  const updateQuery = value => {
    setQuery(value)
    setCurrentPage(1)
  }

  const sendSearchRequest = event => {
    event.preventDefault()
    getList()
  }

  useEffect(() => {
    /**
     * We only want to automatically fetch the main feed if the query is empty
     * The user has to click on the "search" button to update the searched list
     */
    if (!query.length) {
      getList()
    }
  }, [query])

  // Only save in the localStorage the 45 first photos of the main feed (= 3 pages)
  if (list && list.length < 50 && !query.length) {
    localStorage.setItem('photos', JSON.stringify(list))
  } else if (!list.length && localStorage.getItem('photos')) {
    setList(JSON.parse(localStorage.getItem('photos')))
  }

  return (
    <div className='feed'>
      <SearchForm
        query={query}
        setQuery={updateQuery}
        btnMethod={sendSearchRequest}
      />
      <PhotosList list={list} fetchData={getList} />
      <a href='https://www.pexels.com'>Photos provided by Pexels</a>
    </div>
  )
}

export default Feed

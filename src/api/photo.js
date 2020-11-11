import axios from 'axios'

/**
 * Get the feed of photos
 *
 * @param {Number} page current page
 * @returns {Array}
 */
export const getPhotosFeed = async (page = 1) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_BASE_URL}/curated?page=${page}`,
    headers: {
      Authorization: process.env.REACT_APP_API_KEY
    }
  })
    .then(response => {
      return (response.data && response.data.photos) || null
    })
    .catch(error => {
      console.error('getPhotosFeed', error)
      return null
    })
}

/**
 * Search photos matching a query
 *
 * @param {Number} page current page
 * @returns {Array}
 */
export const searchPhotos = async (query, page = 1) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_BASE_URL}/search?query=${query}&page=${page}`,
    headers: {
      Authorization: process.env.REACT_APP_API_KEY
    }
  })
    .then(response => {
      return (response.data && response.data.photos) || null
    })
    .catch(error => {
      console.error('searchPhotos', error)
      return null
    })
}

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
      return (response.data && response.data.photos) || []
    })
    .catch(error => {
      console.error(error)
      return []
    })
}

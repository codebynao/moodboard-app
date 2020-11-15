/**
 * Add a photo to the favorites
 * @param {Object} photo
 * @param {Number} photo.id
 * @param {String} photo.src
 * @param {String} photo.photographer
 * @param {Array<Object>} favorites
 * @returns {Array<Object>}
 */
function addToFavorites(photo, favorites) {
  favorites.push(photo)
  return favorites
}

/**
 * Get the favorites list from the localStorage
 * It returns an empty array if no stored favorites have been found
 * @returns {Array<Object>}
 */
export function getFavorites() {
  let favorites = localStorage.getItem('favorites')
  return favorites ? JSON.parse(favorites) : []
}

/**
 * Handle the "favorite" process
 * It will remove a photo from the list if it was already there
 * and will add the photo if it was not there
 * @param {Object} photo
 * @param {Number} photo.id
 * @param {String} photo.src
 * @param {String} photo.photographer
 */
export function handleFavorite(photo) {
  let favorites = getFavorites()

  favorites = isFavorited(photo.id, favorites)
    ? removeFromFavorites(photo.id, favorites)
    : addToFavorites(photo, favorites)

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

/**
 * Check if a photo has already been favorited
 * @param {String} id
 * @returns {Boolean}
 */
export function isFavorited(id) {
  const favorites = getFavorites()
  if (!favorites || !favorites.length) {
    return false
  }
  return favorites.some(photo => photo.id === id)
}

/**
 * Remove a photo from the favorites list
 * @param {String} id
 * @param {Array<Object>} favorites
 * @returns {Array<Object>}
 */
function removeFromFavorites(id, favorites) {
  const idx = favorites.findIndex(photo => photo.id === id)

  if (idx > -1) {
    favorites.splice(idx, 1)
  }
  return favorites
}

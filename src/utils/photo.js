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
 * Format the complex photo object received from the API into a lighter object
 * @param {Object} photo
 * @param {Number} photo.id
 * @param {Object} photo.src
 * @param {String} photo.photographer
 * @returns {Object} { id, src, photographer }
 */
export function formatPhotoObj(photo) {
  return {
    id: photo.id,
    src: photo.src.medium || photo.src,
    photographer: photo.photographer
  }
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

/**
 * Get the moodboards list from the localStorage
 * It returns an empty array if no stored moodboards have been found
 * @returns {Array<Object>}
 */
export function getMoodboards() {
  let moodboards = localStorage.getItem('moodboards')
  return moodboards ? JSON.parse(moodboards) : []
}

/**
 * Get a moodboard
 * @param {String} moodboardName
 * @returns {Object}
 */
export function getMoodboard(moodboardName) {
  const slug = toKebabCase(moodboardName)
  let moodboards = getMoodboards()
  return moodboards.find(item => item.slug === slug)
}

/**
 * Check if a photo is already in a moodboard
 * @param {String} photoId
 * @param {String} moodboardName
 * @returns {Boolean}
 */
export function isInMoodboard(photoId, moodboardName) {
  const moodboard = getMoodboard(moodboardName)
  if (!moodboard || !moodboard.photos || !moodboard.photos.length) {
    return false
  }
  return moodboard.photos.some(photo => photo.id === photoId)
}

/**
 * Handle the "moodboard" process
 * It will remove a photo from a moodboard if it was already there
 * and will add the photo to this moodboard if it was not there
 * @param {Object} photo
 * @param {Number} photo.id
 * @param {String} photo.src
 * @param {String} photo.photographer
 * @param {String} moodboardName
 */
export function handleMoodboardPhoto(photo, moodboardName) {
  const moodboards = getMoodboards()
  const slug = toKebabCase(moodboardName)
  let moodboard = moodboards.find(item => item.slug === slug)
  if (!moodboard) {
    return
  }

  moodboard = isInMoodboard(photo.id, moodboardName)
    ? removeFromMoodboard(photo.id, moodboard)
    : addToMoodboard(photo, moodboard)

  localStorage.setItem('moodboards', JSON.stringify(moodboards))
}

/**
 * Add a photo to the favorites
 * @param {Object} photo
 * @param {Number} photo.id
 * @param {String} photo.src
 * @param {String} photo.photographer
 * @param {Object} moodboard
 * @param {Array<Object>} moodboard.photos
 * @returns {Object}
 */
function addToMoodboard(photo, moodboard) {
  if (!moodboard.photos) {
    moodboard.photos = []
  }
  moodboard.photos.push(photo)

  return moodboard
}

/**
 * Remove a photo from the favorites list
 * @param {String} id
 * @param {Object} moodboard
 * @param {Array<Object>} moodboard.photos
 * @returns {Object}
 */
function removeFromMoodboard(id, moodboard) {
  if (!moodboard.photos || !moodboard.photos.length) {
    return moodboard
  }
  const idx = moodboard.photos.findIndex(photo => photo.id === id)

  if (idx > -1) {
    moodboard.photos.splice(idx, 1)
  }
  return moodboard
}

/**
 * Create a new moodboard with the selected photo and update moodboards list
 * @param {Object} photo
 * @param {String} moodboardName
 * @returns {Array<Object>}
 */
export function createMoodBoard(photo, moodboardName) {
  console.log(moodboardName, toKebabCase(moodboardName.trim()))
  const newMoodboard = {
    name: moodboardName.trim(),
    slug: toKebabCase(moodboardName.trim()),
    photos: [photo]
  }

  const moodboards = getMoodboards()
  const newList = [...moodboards, newMoodboard]

  localStorage.setItem('moodboards', JSON.stringify(newList))
  return newList
}

/**
 * Convert a string to Kebab case
 * @param {String} str
 * @returns {String}
 */
function toKebabCase(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('-')
  )
}

/**
 * Remove moodboard from list of moodboards
 * @param {String} slug
 */
export function removeMoodboard(slug) {
  const moodboards = getMoodboards()
  const idx = moodboards.findIndex(moodboard => moodboard.slug === slug)

  if (idx > -1) {
    moodboards.splice(idx, 1)
  }
  localStorage.setItem('moodboards', JSON.stringify(moodboards))
}

import { toKebabCase } from './text'

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
 * Create a new moodboard with the selected photo and update moodboards list
 * @param {Object} photo
 * @param {String} moodboardName
 * @returns {Array<Object>}
 */
export function createMoodBoard(photo, moodboardName) {
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
 * Get the moodboards list from the localStorage
 * It returns an empty array if no stored moodboards have been found
 * @returns {Array<Object>}
 */
export function getMoodboards() {
  let moodboards = localStorage.getItem('moodboards')
  return moodboards ? JSON.parse(moodboards) : []
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

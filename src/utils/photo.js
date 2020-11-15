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

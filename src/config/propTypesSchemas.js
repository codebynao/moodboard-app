import PropTypes from 'prop-types'

export const photoType = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired
  }).isRequired
}

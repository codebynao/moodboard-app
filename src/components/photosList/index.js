import React from 'react'
import PropTypes from 'prop-types'

// Components
import PhotoCard from '../../components/photoCard'
import InfiniteScroll from 'react-infinite-scroll-component'

// Utils
import { formatPhotoObj } from '../../utils/photo'

const PhotosList = ({ list, fetchData, hasMore, endMessage }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchData}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{endMessage}</b>
          </p>
        }
      >
        {list.map((photo, index) => (
          <div key={index}>
            <PhotoCard photo={formatPhotoObj(photo)} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

PhotosList.defaultProps = {
  hasMore: true,
  endMessage: 'The end...'
}

PhotosList.propTypes = {
  list: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
  fetchData: function (props, propName) {
    if (
      props.hasMore &&
      (props[propName] == undefined || typeof props[propName] != 'function')
    ) {
      return new Error('Please provide a method function!')
    }
  },
  endMessage: PropTypes.string
}

export default PhotosList

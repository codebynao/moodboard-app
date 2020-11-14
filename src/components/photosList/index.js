import React from 'react'
import PropTypes from 'prop-types'

// Components
import PhotoCard from '../../components/photoCard'
import InfiniteScroll from 'react-infinite-scroll-component'

// Utils
import { formatPhotoObj } from '../../utils/photo'

const PhotosList = ({ list, fetchData, hasMore }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchData}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all 🎉</b>
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
  hasMore: true
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
  }
}

export default PhotosList

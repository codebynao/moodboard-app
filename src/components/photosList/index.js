import React from 'react'
import PropTypes from 'prop-types'

// Components
import PhotoCard from '../../components/photoCard'
import InfiniteScroll from 'react-infinite-scroll-component'

// Utils
import { formatPhotoObj } from '../../utils/photo'

const PhotosList = ({ list, fetchData }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchData}
        hasMore={true}
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

PhotosList.propTypes = {
  list: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired
}

export default PhotosList

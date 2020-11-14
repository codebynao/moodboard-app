import React, { useEffect, useState } from 'react'

// Components
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import MoodboardsList from '../moodboardsList'
import PhotosList from '../photosList'

// Styles
import 'react-tabs/style/react-tabs.css'

const UserPhotoTabs = () => {
  const [favorites, setFavorites] = useState([])
  const [moodboards, setMoodboards] = useState([])

  useEffect(() => {
    if (localStorage.getItem('favorites')) {
      setFavorites(JSON.parse(localStorage.getItem('favorites')).reverse())
    }
    if (localStorage.getItem('moodboards')) {
      setMoodboards(JSON.parse(localStorage.getItem('moodboards')))
    }
  }, [])

  return (
    <Tabs>
      <TabList>
        <Tab>Moodboards</Tab>
        <Tab>Favorites</Tab>
      </TabList>

      <TabPanel>
        <MoodboardsList list={moodboards} />
      </TabPanel>
      <TabPanel>
        <PhotosList list={favorites} hasMore={false} />
      </TabPanel>
    </Tabs>
  )
}

export default UserPhotoTabs

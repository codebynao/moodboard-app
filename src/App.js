import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/search`,
      params: {
        query: 'forest',
      },
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((result) => {
        setList(result.data.photos)
      })
      .catch((error) => console.error(error))
  }, [])
  console.log(list, localStorage.getItem('photos'))
  if (list && list.length) {
    localStorage.setItem('photos', JSON.stringify(list))
  } else if (!list.length && localStorage.getItem('photos')) {
    setList(JSON.parse(localStorage.getItem('photos')))
  }
  return (
    <div className='App'>
      <header className='App-header'>
        {list.map((photo) => (
          <div key={photo.id}>
            <img src={photo.src.small} alt={photo.photographer} />
          </div>
        ))}
        <a href='https://www.pexels.com'>Photos provided by Pexels</a>
      </header>
    </div>
  )
}

export default App

import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Room from './pages/Room'

function App() {
  return (

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Room/:id' element={<Room />}/>
    </Routes>
  )
}

export default App
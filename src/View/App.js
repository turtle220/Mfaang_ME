import React from 'react'
import { useDispatch } from 'react-redux'

import Footer from '../components/Footer/index'
import Navbar from '../components/Navbar/index'
import Home from './Home/index'

function App() {
  const dispatch = useDispatch()

  return (
    <div className='app'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { Avatar, Button } from '@material-ui/core'
import $ from 'jquery'
import firebase from 'firebase'

import { db, auth, storage } from '../firebase'
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

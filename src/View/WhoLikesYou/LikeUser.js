import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Avatar, Button } from '@material-ui/core'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Post from '../Meet/post'
import Pagination from '../../components/Pagination/index'
import Delete from '../../images/button-delete.svg'
// import BackButton from '../../images/button-boldback.svg';
import imageTest1 from '../../images/test(1).jpg'
import { Dns, SortOutlined } from '@material-ui/icons'

function LikeUser({ email, id }) {
  // const [likePersons, setLikePersons] = useState([])

  const [image, setImage] = useState('')
  const [postId, setPostId] = useState('')
  console.log(email, '---email:')

  useEffect(() => {
    if (image == '') {
      storage
        .ref(`avatars/${email}-avatar.png`)
        .getDownloadURL()
        .then((url) => {
          setImage(url)
        })
    }
  })

  return (
    <>
      {image ? (
        <a href={`/singleitem/${id}`}>
          <img
            src={image}
            alt={image}
            style={{
              width: '100px',
              height: '100px',
              color: '#8f8f8f',
              borderRadius: '10px'
            }}
          />
        </a>
      ) : (
        <div
          style={{
            width: '100px',
            height: '100px',
            color: '#8f8f8f',
            borderRadius: '10px',
            backgroundColor: '#bfbfbf'
          }}></div>
      )}
    </>
  )
}

export default LikeUser

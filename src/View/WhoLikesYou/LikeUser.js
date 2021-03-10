import React, { useState, useEffect } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'

import './index.css'
import { storage } from '../../firebase'

function LikeUser({ email, id }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (image === '') {
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
              borderRadius: '10px',
              objectFit: 'cover'
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

import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'

import './index.css'
import { storage } from '../../firebase'

function LikeUser({ email }) {
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
        <Avatar
          src={image}
          alt={image}
        />
      ) : (
        <Avatar />
      )}
    </>
  )
}

export default LikeUser

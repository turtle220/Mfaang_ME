import React, { useState, useEffect } from 'react'

import { db } from '../../firebase'

function SingleImage({ id, post }) {

  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (post.userEmail && post) {
      if (!userProfile) {
        db.collection('UserProfile')
          .doc(post.userEmail)
          .get()
          .then((doc) => {
            setUserProfile(doc.data())
          })
          .catch((err) => {
            console.log('getting username error!', err.message)
          })
      }
    }
  }, [userProfile])

  return (
    <div >
        <a style={{ color: '#8F8F8F' }} href={`/singleitem/${id}`}>
          <img
            key={id}
            src={post.imageUrl}
            style={{ width: '100%', height: 240, objectFit:'cover' }}
            alt=''
          />
        </a>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <p style={{ color: '#8F8F8F', whiteSpace: 'nowrap' }}>
            {userProfile ? userProfile.firstName : ''}
          </p>
        </div>
    </div>
  )
}

export default SingleImage

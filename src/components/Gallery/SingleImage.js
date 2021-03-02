import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { Avatar, Button } from '@material-ui/core'
import $ from 'jquery'
import firebase from 'firebase'

import { db, auth, storage } from '../../firebase'
import RedHeartButton from '../../images/Button-RedHeart.svg'
import HeartButton from '../../images/Button-Heart.svg'

function SingleImage({ id, post }) {
  // const dispatch = useDispatch();
  // const [emailVerified, setEmailVerified] = useState('');
  const [userProfile, setUserProfile] = useState(null)
  const [age, setAge] = useState('')
  const [isToggle, setIsToggle] = useState(false)

  useEffect(() => {
    if (post.userEmail && !post.length) {
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
      {/* <div
        style={{
          height: 200,
          width: '100%',
          background: '#EEE'
        }}> */}
        <a style={{ color: '#8F8F8F' }} href={`/singleitem/${id}`}>
          <img
            key={id}
            src={post.imageUrl}
            style={{ width: '100%', height: 240 }}
            alt=''
          />
        </a>
      {/* </div> */}
      {/* <div className='desc'> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <p style={{ color: '#8F8F8F', whiteSpace: 'nowrap' }}>
            {userProfile ? userProfile.firstName : ''}
          </p>
        </div>
      {/* </div> */}
    </div>
  )
}

export default SingleImage

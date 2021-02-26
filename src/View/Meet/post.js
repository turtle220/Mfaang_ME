import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { Avatar, Button } from '@material-ui/core'
import $ from 'jquery'
import firebase from 'firebase'

import { db, auth, storage } from '../../firebase'
import RedHeartButton from '../../images/Button-RedHeart.svg'
import HeartButton from '../../images/Button-Heart.svg'

function Post({ id, post }) {
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
    if (userProfile) {
      const currentYear = new Date().getFullYear()
      const currentAge = currentYear - userProfile.years
      if (!age) {
        setAge(currentAge)
      }
    }
  }, [userProfile, age])

  return (
    <div className='gallery'>
      <div
        style={{
          height: 200,
          width: '100%',
          background: '#EEE'
        }}>
        <a style={{ color: '#8F8F8F' }} href={`/singleitem/${id}`}>
          <img
            key={id}
            src={post.imageUrl}
            style={{ width: '100%', height: 200 }}
            alt=''
          />
        </a>
      </div>
      <div className='desc'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <p style={{ color: '#8F8F8F', whiteSpace: 'nowrap' }}>
            {userProfile ? userProfile.username : null}
          </p>
          <p style={{ color: '#8F8F8F' }}>
            {userProfile ? userProfile.gender : null}
          </p>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'block', width: '70%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <div style={{ float: 'left', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#8F8F8F' }}>
                  {userProfile ? userProfile.country : null}
                </span>
              </div>
              <div style={{ float: 'right', color: '#8F8F8F', whiteSpace: 'nowrap' }}>
                {userProfile ? age : null}
              </div>
            </div>
            <div
              style={{
                color: '#8F8F8F',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
              <div style={{ float: 'left', color: '#8F8F8F', whiteSpace: 'nowrap' }}>
                <span>{userProfile ? userProfile.city : null}</span>
              </div>
              <div style={{ float: 'right', color: '#8F8F8F', whiteSpace: 'nowrap' }}>
                <span>{userProfile ? userProfile.state : null}</span>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: '3%', display: 'flex', width: '30%' }}>
            <button
              onClick={() => setIsToggle(!isToggle)}
              style={{
                cursor: 'pointer',
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent'
              }}>
              {isToggle ? (
                <img
                  src={RedHeartButton}
                  alt=''
                  style={{ width: '70%', marginLeft: '15%' }}
                />
              ) : (
                <img
                  src={HeartButton}
                  alt=''
                  style={{ width: '70%', marginLeft: '15%' }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
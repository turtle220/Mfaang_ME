import React, { useState, useEffect } from 'react'

import { db, auth } from '../../firebase'
import RedHeartButton from '../../images/Button-RedHeart.svg'
import HeartButton from '../../images/Button-Heart.svg'

function Post({ id, post }) {
  const [userProfile, setUserProfile] = useState(null)
  const [isToggle, setIsToggle] = useState(true)

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

  useEffect(() => {
    if (post.userEmail && isToggle) {
      db.collection('UserProfile')
        .doc(post.userEmail)
        .collection('wholikesyou')
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (
              doc.data().heart &&
              doc.data().heart === true &&
              auth.currentUser.email === doc.data().likeUserEmail
            ) {
              setIsToggle(isToggle === false ? true : false)
            }
          })
        })
    }
  }, [isToggle])
  const isLiked = async () => {
    
    if (auth.currentUser.emailVerified && auth.currentUser && post.userEmail) {
      // email: post user email
      const snapshot = await db
      .collection('UserProfile')
      .doc(post.userEmail)
      .collection('wholikesyou')
      .get()
      const likeUserArray = []

      for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i]
        likeUserArray.push(doc.data())
      }
      let flag = false

      if (isToggle && likeUserArray) {
        likeUserArray.forEach((element) => {
          if (element.likeUserEmail === auth.currentUser.email) {
            flag = true
          }
        })
        if (!flag) {
          db.collection('UserProfile')
            .doc(post.userEmail)
            .collection('wholikesyou')
            .add({
              likeUserEmail: auth.currentUser.email,
              heart: true
            })
            .catch((err) => {
              console.log(err)
            })

          db.collection('UserProfile')
            .doc(auth.currentUser.email)
            .collection('wholikesyou')
            .add({
              likeUserEmail: post.userEmail,
              heart: true
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
        }
        console.log('----Updated')
      }
      if (isToggle && !likeUserArray) {
        db.collection('UserProfile')
          .doc(post.userEmail)
          .collection('wholikesyou')
          .add({
            likeUserEmail: auth.currentUser.email,
            heart: true
          })
          .catch((err) => {
            console.log(err)
          })

        db.collection('UserProfile')
          .doc(auth.currentUser.email)
          .collection('wholikesyou')
          .add({
            likeUserEmail: post.userEmail
          })
          .catch((err) => {
            console.log(err)
          })
        console.log('---------created')
      }
      //remove heart
      if (!isToggle && likeUserArray) {
        db.collection('UserProfile')
          .doc(post.userEmail)
          .collection('wholikesyou')
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              db.collection('UserProfile')
                .doc(post.userEmail)
                .collection('wholikesyou')
                .doc(doc.id)
                .delete()
                .then(setIsToggle(true))
            })
          })
          .catch((err) => {
            console.log(err)
          })

        db.collection('UserProfile')
          .doc(auth.currentUser.email)
          .collection('wholikesyou')
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              db.collection('UserProfile')
                .doc(auth.currentUser.eamil)
                .collection('wholikesyou')
                .doc(doc.id)
                .delete()
                .then(setIsToggle(true))
            })
          })
          .catch((err) => {
            console.log(err)
          })
        console.log('---------removed')
      }
    }
    // setTimeout(() => window.location.reload(), 1000)
  }

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
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
            alt=''
          />
        </a>
      </div>
      <div className='desc' style={{ height: '93px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <p style={{ color: '#8F8F8F', whiteSpace: 'nowrap' }}>
            {userProfile ? userProfile.firstName : ''}
          </p>
          <p style={{ color: '#8F8F8F' }}>
            {userProfile ? userProfile.yourGender : ''}
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
              <div
                style={{
                  float: 'right',
                  color: '#8F8F8F',
                  whiteSpace: 'nowrap'
                }}>
                {userProfile ? userProfile.years : null}
              </div>
            </div>
            <div
              style={{
                color: '#8F8F8F',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
              <div
                style={{
                  float: 'left',
                  color: '#8F8F8F',
                  whiteSpace: 'nowrap'
                }}>
                <span>{userProfile ? userProfile.city : null}</span>
              </div>
              <div
                style={{
                  float: 'right',
                  color: '#8F8F8F',
                  whiteSpace: 'nowrap'
                }}>
                <span>{userProfile ? userProfile.state : null}</span>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: '13.5%', display: 'flex', width: '32%' }}>
            <button
              onClick={() => {
                isLiked()
              }}
              style={{
                cursor: 'pointer',
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent'
              }}>
              {!isToggle ? (
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

import React, { useState, useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'

//email: postUser email
function SingleItem({ posts, imgUrl, imageName, email, postId, postImages }) {
  const [imageUrl, setImageUrl] = useState('')
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (imageUrl === '') {
      if (email) {
        storage
          .ref(`avatars/${email}-avatar.png`)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url)
          })
          .catch(function (error) {
            console.error('There is not existing the avatar! ', error)
          })
      }
    }
  })

  useEffect(() => {
    if (!userProfile && email) {
      db.collection('UserProfile')
        .doc(email)
        .get()
        .then((doc) => {
          setUserProfile(doc.data())
        })
        .catch((err) => {
          console.log('getting username error!', err.message)
        })
    }
  })
  const isLiked = async () => {
    const likeUserArray = []
    if (auth.currentUser.emailVerified && auth.currentUser && email) {
      // email: post user email
      const snapshot = await db
        .collection('UserProfile')
        .doc(email)
        .collection('wholikesyou')
        .get()

      for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i]
        likeUserArray.push(doc.data())
      }
      let flag = false

      if (likeUserArray) {
        likeUserArray.forEach((element) => {
          if (element.likeUserEmail === auth.currentUser.email) {
            flag = true
          }
        })
        if (!flag) {
          db.collection('UserProfile')
            .doc(email)
            .collection('wholikesyou')
            .add({
              likeUserEmail: auth.currentUser.email
            })
            .catch((err) => {
              console.log(err)
            })

          db.collection('UserProfile')
            .doc(auth.currentUser.email)
            .collection('wholikesyou')
            .add({
              likeUserEmail: email
            })
            .catch((err) => {
              console.log(err)
            })
        } else {

        }
        console.log('----Updated')
      }
      if (!likeUserArray) {
        db.collection('UserProfile')
          .doc(email)
          .collection('wholikesyou')
          .add({
            likeUserEmail: auth.currentUser.email
          })
          .catch((err) => {
            console.log(err)
          })

        db.collection('UserProfile')
          .doc(auth.currentUser.email)
          .collection('wholikesyou')
          .add({
            likeUserEmail: email
          })
          .catch((err) => {
            console.log(err)
          })

        console.log('---------created')
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <div
          style={{
            backgroundColor: 'white',
            paddingLeft: '10%',
            display: 'block',
            paddingTop: '2%'
          }}>
          <div>
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
              {userProfile && userProfile.firstName}
            </p>
    
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '40%'
            }}>
        
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {/* Company Name:{' '} */}
              {userProfile &&
                userProfile.emailAddress &&
                userProfile.emailAddress.split('@')[1]}
            </p>
    
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
               {userProfile && userProfile.yourGender}
            </p>
 
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.years}
            </p>

            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.city}
            </p>

            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.state}
            </p>

            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
                // diplay: 'flex'
              }}>
              {userProfile && userProfile.country}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            paddingLeft: '10%',
            paddingTop: '2%',
            width: '90%',
            justifyContent: 'space-between'
          }}>

          {/* first postUser Image */}
          {postImages.length && postImages[0] ? (
            <img
              src={postImages[0].postUserImage}
              alt=''
              style={{ width: '290px', height: '270px', objectFit:'cover', boxShadow:'12px 10px 10px #88888f', border: '19px solid #dbdbdb', borderBottom: '35px solid #dfdfdf' }}
            />
          ) : null}
          {/* second postUser Image */}
          {postImages.length && postImages[1] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[1].postUserImage}
              alt=''
              style={{ width: '290px', height: '270px', objectFit:'cover', boxShadow:'12px 10px 10px #88888f', border: '19px solid #dbdbdb', borderBottom: '35px solid #dfdfdf' }}
            />
          ) : // </div>
          null}
          {/* third postUser Image */}
          {postImages.length && postImages[2] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[2].postUserImage}
              alt=''
              style={{ width: '290px', height: '270px', objectFit:'cover', boxShadow:'12px 10px 10px #88888f', border: '19px solid #dbdbdb', borderBottom: '35px solid #dfdfdf' }}
            />
          ) : // </div>
          null}
          {/* forth postUser Image */}
          {postImages.length && postImages[3] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[3].postUserImage}
              alt=''
              style={{ width: '290px', height: '270px', objectFit:'cover', boxShadow:'12px 10px 10px #88888f', border: '19px solid #dbdbdb', borderBottom: '35px solid #dfdfdf' }}
            />
          ) : // </div>
          null}
        </div>
        {/* </div> */}
        <div
          style={{
            paddingLeft: '10%',
            paddingTop: '2%',
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'
          }}>
          <div style={{ display: 'flex', width: '50%' }}>
            <Avatar src={imageUrl} alt='' />
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                paddingLeft: '2%',
                fontWeight: 'bold'
              }}>
              {' '}
              Here is something about myself{' '}
            </p>
          </div>
          {auth.currentUser && auth.currentUser.email && auth.currentUser.emailVerified && <Button
            variant='contained'
            color='secondary'
            size='medium'
            onClick={isLiked}
            style={{
              backgroundColor: '#F699CD',
              minWidth: '200px',
              maxWidth: '200px'
            }}>
            I like to know you
          </Button> }
        </div>
        <div
          style={{
            width: '90%',
            paddingLeft: '10%',
            paddingTop: '2%',
            paddingBottom: '2%'
          }}>
          <hr style={{borderColor:'#8f8f8f42'}}></hr>
        </div>
        <div style={{ color: '#8F8F8F', paddingLeft: '10%', width: '90%' }}>
          <div style={{border:'solid 1px #8f8f8f42', height: '150px'}}>
            {userProfile ? userProfile.introduction : ''}
          </div>
        </div>
        <Pagination location={`/admin`} />
      </div>
      <Footer />
    </div>
  )
}

export default SingleItem

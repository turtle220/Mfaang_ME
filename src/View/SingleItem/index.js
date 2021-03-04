import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Avatar, Button } from '@material-ui/core'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import MembersFrom from '../../images/Home/MembersFrom.svg'
import Post from '../Meet/post'
import Pagination from '../../components/Pagination/index'

//email: postUser email
function SingleItem({ posts, imgUrl, imageName, email, postId, postImages }) {
  const ps = useRef()
  const [imageUrl, setImageUrl] = useState('')
  const [userProfile, setUserProfile] = useState(null)
  const [likeUserEmail, setLikeUserEmail] = useState('')
  console.log(postImages, '-----singleItem:')

  // useEffect(() => {
  //   db.collection('post')
  //   .doc(email)
  //   .get()

  // })
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
  // console.log(userProfile, '---------UserProfileSingleItem:')
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
          // db.collection('UserProfile')
          //   .doc(auth.currentUser.email)
          //   .collection('wholikesyou')
          //   .add({
          //     likeUserEmail: auth.currentUser.email
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
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
            {/* <span
              style={{
                fontSize: '26px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}>
            </span> */}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '40%'
            }}>
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            {/* </span> */}
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
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
               {userProfile && userProfile.yourGender}
            </p>
            {/* </span> */}
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.years}
            </p>
            {/* </span> */}
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                // fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.city}
            </p>
            {/* </span> */}
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
              }}>
              {userProfile && userProfile.state}
            </p>
            {/* </span> */}
            {/* <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#8f8f8f'
              }}> */}
            <p
              style={{
                color: '#8F8F8F',
                paddingTop: '1%',
                whiteSpace: 'nowrap'
                // diplay: 'flex'
              }}>
              {userProfile && userProfile.country}
            </p>
            {/* </span> */}
          </div>
        </div>

        {/* <div
          id='meets'
          style={{
            backgroundColor: 'white',
            paddingLeft: '10%',
            display: 'block',
            paddingTop: '5%',
            paddingBottom: '3%',
            width: '96%',
            height: '440px',
            overflowY: 'auto'
          }}>
          <PerfectScrollbar containerRef={(el) => (ps.current = el)}>
            {posts.length
              ? posts.map(({ id, post }) => {
                  return <Post key={id} id={id} post={post} />
                })
              : null}
          </PerfectScrollbar>
        </div> */}
        {/* <div
          style={{
            backgroundColor: 'white',
            paddingLeft: '10%',
            display: 'block',
            paddingTop: '5%',
            paddingBottom: '3%',
            width: '96%',
            height: '440px',
            overflowY: 'auto'
          }}> */}
        <div
          style={{
            display: 'flex',
            paddingLeft: '10%',
            paddingTop: '2%',
            width: '90%',
            justifyContent: 'space-between'
          }}>
          {/* {postImages.length &&
            postImages.map((postImage) => (
              <img
                src={postImage.postUserImage}
                alt=''
                style={{ width: '250px', height: '220px' }}
              />
            ))} */}

          {/* first postUser Image */}
                 
          {postImages.length && postImages[0] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[0].postUserImage}
              alt=''
              style={{ width: '250px', height: '220px' }}
            />
          ) : // </div>
          // posts[0].post.imageUrl
          // posts.map(({ id, post }) => {
          // console.log(posts.length,'-----postLength:')
          // return <Post key={id} id={id} post={post} />
          // })
          null}
          {/* second postUser Image */}
          {postImages.length && postImages[1] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[1].postUserImage}
              alt=''
              style={{ width: '250px', height: '220px' }}
            />
          ) : // </div>
          null}
          {/* third postUser Image */}
          {postImages.length && postImages[2] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[2].postUserImage}
              alt=''
              style={{ width: '250px', height: '220px' }}
            />
          ) : // </div>
          null}
          {/* forth postUser Image */}
          {postImages.length && postImages[3] ? (
            // <div style={{ display: 'flex' }}>
            <img
              src={postImages[3].postUserImage}
              alt=''
              style={{ width: '250px', height: '220px' }}
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
          <Button
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
          </Button>
        </div>
        <div
          style={{
            width: '60%',
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
          {/* Item Introduction from owner: Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor */}
        </div>
        <Pagination location={`/admin`} />
      </div>
      <Footer />
    </div>
  )
}

export default SingleItem

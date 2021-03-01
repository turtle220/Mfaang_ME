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
// import imageTest1 from '../../images/test(1).jpg';
// import BackButton from '../../images/button-boldback.svg';

function SingleItem({ posts, imageName, email, postId }) {
  const ps = useRef()
  const [imageUrl, setImageUrl] = useState('')
  const [userProfile, setUserProfile] = useState(null)
  const [likeUserEmail, setLikeUserEmail] = useState('')
  // const [posts, setPosts] = useState([])
  // const [user, setUser] = useState(null)
  // const [userProfile, setUserProfile] = useState([])

  // useEffect(() => {
  //   if (!posts.length) {
  //     db.collection('post')
  //       .orderBy('timestamp', 'desc')
  //       .onSnapshot((snapshot) => {
  //         //every time a new post is added, it fires up onSnapshot
  //         setPosts(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             post: doc.data()
  //           }))
  //         )
  //       })
  //   }
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
            paddingTop: '5%'
          }}>
          <div>
            <span
              style={{
                fontSize: '30px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#0000008a'
              }}>
              Members from
            </span>
          </div>
          <img
            src={MembersFrom}
            alt=''
            style={{ paddingTop: '2%', width: '90%' }}
          />
        </div>

        <div
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
        </div>
        <div
          style={{
            paddingLeft: '10%',
            paddingTop: '1%',
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'
          }}>
          <div style={{ display: 'flex', width: '50%' }}>
            <Avatar src={imageUrl} alt='' />
            <p
              style={{ color: '#8F8F8F', paddingTop: '1%', paddingLeft: '2%' }}>
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
          <hr></hr>
        </div>
        <div style={{ color: '#8F8F8F', paddingLeft: '10%', width: '90%' }}>
          {userProfile ? userProfile.introduction : ''}
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
        <Pagination />
      </div>
      <Footer />
    </div>
  )
}

export default SingleItem

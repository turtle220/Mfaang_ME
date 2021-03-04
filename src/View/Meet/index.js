import React, { useState, useEffect, useRef } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import MembersFrom from '../../images/Home/MembersFrom.svg'
import Post from './post'

function Meet() {
  const ps = useRef()
  const [posts, setPosts] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [uniqueUser, setUniqueUser] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!posts.length) {
        db.collection('post')
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            //every time a new post is added, it fires up onSnapshot
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
              }))
            )
          })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [posts])

  //Unique Function
  useEffect(() => {
    if (!uniqueUser.length) {
      if (posts.length) {
        const postEmailArray = []
        const uniqueUserArray = []
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i]
          if (!postEmailArray.includes(element.post.userEmail)) {
            postEmailArray.push(element.post.userEmail)
            uniqueUserArray.push(element)
          }
        }
        console.log(uniqueUserArray, postEmailArray, '--------UniqueFunction:')
        setUniqueUser(uniqueUserArray)
      }
    }
  })

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
                fontSize: '26px',
                fontFamily: 'system-ui',
                fontWeight: '700',
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
            height: '100%'
          }}>
          <PerfectScrollbar containerRef={(el) => (ps.current = el)}>
            {uniqueUser.length ? (
              uniqueUser.map(({ id, post }) => {
                return <Post key={id} id={id} post={post} />
              })
            ) : (
              <></>
            )}
          </PerfectScrollbar>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Meet

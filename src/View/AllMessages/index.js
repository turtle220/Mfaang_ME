import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Avatar, Button } from '@material-ui/core'
import firebase from 'firebase'
import { Provider, useSelector } from 'react-redux';

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'
import ChatRoomChannel from './ChatRoomChannel'
// import MembersFrom from '../../images/Home/MembersFrom.svg'
// import imageTest1 from '../../images/test(1).jpg';
// import Post from '../Meet/post'
// import BackButton from '../../images/button-boldback.svg';
// import AutoScroll from './AutoScroll'
// import NewChatMessage from './NewChatMessage'

function AllMessage() {
  // const ps = useRef()
  // const [posts, setPosts] = useState([])
  // const [userProfile, setUserProfile] = useState([])

//   const userLikeEmail = useSelector((state) => state);
// console.log(userLikeEmail, '----------messageuserlikeemail:')
  // console.log(firstName, gender, age, city, state, country, likeUsers, userId, '-------------AllMessages:')

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (!posts.length) {
  //       db.collection('post')
  //         .orderBy('timestamp', 'desc')
  //         .onSnapshot((snapshot) => {
  //           //every time a new post is added, it fires up onSnapshot
  //           setPosts(
  //             snapshot.docs.map((doc) => ({
  //               id: doc.id,
  //               post: doc.data()
  //             }))
  //           )
  //         })
  //     }
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [posts])

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '5%', paddingLeft: '10%', width: '90%' }}>
        <div>
          <span
            style={{
              fontSize: '30px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a'
            }}>
            All Messages{' '}
          </span>
        </div>
        <div style={{ paddingTop: '3%', color: '#8f8f8f' }}>
          <hr style={{ color: '#DBDBDB' }}></hr>
        </div>
        <div
          style={{
            display: 'flex',
            height: '300px'
          }}>
          <div
            style={{
              display: 'block',
              backgroundColor: 'white',
              paddingLeft: '10%',
              paddingTop: '2%',
              paddingBottom: '3%',
              width: '30%',
              height: '280px',
              overflowY: 'auto'
            }}>
            <PerfectScrollbar>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
              <div>sdfsdfsdf</div>
            </PerfectScrollbar>
          </div>
          <ChatRoomChannel />
        </div>
        <div style={{ paddingTop: '3%', color: '#8f8f8f' }}>
          <hr style={{ color: '#DBDBDB' }}></hr>
        </div>
      </div>
      <div>
        <Pagination />
      </div>
      <Footer />
    </div>
  )
}

export default AllMessage

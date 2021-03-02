import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import { Avatar, Button } from '@material-ui/core'
// import firebase from 'firebase'
// import { Provider, useSelector } from 'react-redux'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'
import ChatRoomChannel from './ChatRoomChannel'
import LikeUser from './LikeUser'
// import MembersFrom from '../../images/Home/MembersFrom.svg'
// import imageTest1 from '../../images/test(1).jpg';
// import Post from '../Meet/post'
// import BackButton from '../../images/button-boldback.svg';
// import AutoScroll from './AutoScroll'
// import NewChatMessage from './NewChatMessage'
// import { nodeName } from 'jquery'

function FirstPage() {
  console.log(window.location.href, '-----match:')
  const id = '';
  // console.log(id, '-----id:')
  // const [likeUserProfile, setLikeUserProfile] = useState(null)
  const [likePersons, setLikePersons] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (authUser.email && !likePersons.length) {
          const userLikeArray = []

          db.collection('UserProfile')
            .doc(authUser.email)
            .collection('wholikesyou')
            .get()
            .then((snapshot) => {
              for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i]

                db.collection('UserProfile')
                  .doc(doc.data().likeUserEmail)
                  .get()
                  .then((doc) => {
                    userLikeArray.push(doc.data())
                  })
              }

              setTimeout(() => {
                setLikePersons(userLikeArray)
              }, 2000)
            })
        }
      }
    })

    return () => {
      unsubscribe()
    }
  })

  // useEffect(() => {
  //   if (id && !likeUserProfile) {
  //     db.collection('UserProfile')
  //       .doc(id.id)
  //       .get()
  //       .then((doc) => {
  //         setLikeUserProfile(doc.data())
  //         // setUsername(doc.data()['firstName'])
  //         // console.log(doc.data(), '-------docData:')
  //       })
  //       .catch((err) => {
  //         console.log('getting username error!', err.message)
  //       })
  //   }
  // })
  // console.log(likeUserProfile, '-----likeUserProfile')
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
              paddingLeft: '1%',
              // paddingTop: '2%',
              paddingBottom: '3%',
              width: '40%',
              height: '280px',
              overflowY: 'auto'
            }}>
            <PerfectScrollbar>
              {likePersons.length ? (
                likePersons.map((person, id) => {
                  if (person) {
                    // const currentYear = new Date().getFullYear()
                    // const currentAge = currentYear - person.years

                    return (
                      <a
                        key={id}
                        href={`/allmessages/${person.emailAddress}`}
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          backgroundColor: '#DBDBDB',
                          marginTop: '5%',
                          borderRadius: '7px',
                          height: '60px',
                          cursor: 'pointer'
                        }}>
                        <div style={{ paddingLeft: '3%', paddingTop: '3%' }}>
                          <LikeUser email={person.emailAddress} />
                        </div>
                        <div style={{ display: 'block', paddingLeft: '3%' }}>
                          <div style={{ fontWeight: 'bold', color: '#707070' }}>
                            {person.firstName}
                          </div>
                          <div style={{ display: 'flex', color: '#707070' }}>
                            {person.yourGender}, {person.years}, {person.city},{' '}
                            {person.state}, {person.country}
                          </div>
                        </div>
                      </a>
                    )
                  }
                })
              ) : (
                <></>
              )}
              {/* {likeUserProfile ? (
                likeUserProfile.map((data) => {

                  console.log(data, '--------data:')
                  const currentYear = new Date().getFullYear
                  const currentAge = currentYear - data.years

                  return (
                    <div style={{ display: 'block' }}>
                      <p>{data.firstName}</p>
                      <div style={{ display: 'flex' }}>
                        <p>{data.yourGender}</p>
                        <p>{currentAge}</p>
                        <p>{data.city}</p>
                        <p>{data.state}</p>
                        <p>{data.country}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <></>
              )} */}
            </PerfectScrollbar>
          </div>
          {/* {console.log(id, '------id:')} */}
          <ChatRoomChannel email={id.id} />
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

export default FirstPage

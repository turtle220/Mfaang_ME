import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Avatar, Button } from '@material-ui/core'
import firebase from 'firebase'
import { Provider, useSelector } from 'react-redux'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'
import ChatRoomChannel from './ChatRoomChannel'
import LikeUser from './LikeUser'

function AllMessages(id) {

  const [likePersons, setLikePersons] = useState([])
  const [uniqueUser, setUniqueUser] = useState('')

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
  // console.log(likePersons, '----likePersons:')
  useEffect(() => {
    if (!uniqueUser.length) {
      if (likePersons.length) {
        const likeUserEmailArray = []
        const uniqueUserArray = []
        for (let i = 0; i < likePersons.length; i++) {
          const element = likePersons[i]
          if (!likeUserEmailArray.includes(element.emailAddress) || !likeUserEmailArray.includes(element.emailAddress)) {
            likeUserEmailArray.push(element.emailAddress)
            uniqueUserArray.push(element)
          }
        }
        setUniqueUser(uniqueUserArray)
      }
    }
  })

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '5%', paddingLeft: '10%', width: '90%' }}>
        <div>
          <span
            style={{
              fontSize: '26px',
              fontFamily: 'system-ui',
              fontWeight: '700',
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
            height: '400px'
          }}>
          <div
            style={{
              display: 'block',
              backgroundColor: 'white',
              paddingLeft: '1%',
              paddingBottom: '3%',
              width: '40%',
              height: '433px',
              overflowY: 'auto',
              borderRight: 'solid',
              borderRightColor: '#DBDBDB',
              paddingRight: '1%'
            }}>
            <PerfectScrollbar>
              {uniqueUser.length ? (
                uniqueUser.map((person, id) => {
                  if (person) {
                    // if(window.location.href)
                    let hightlight = '';
                    // console.log(window.location.href.split('/')[4], person.email, '----href:')
                    if(window.location.href.split('/')[4] === person.email || window.location.href.split('/')[3] === person.email) {
                      hightlight = 'highlight';
                    }

                    return (
                      <a key={id} href={`/allmessages/${person.email}`} className={hightlight} style={{ textDecoration:'none', display: 'flex', backgroundColor:'#DBDBDB', marginTop:'5%', borderRadius:'7px', height:'60px', cursor: 'pointer'}}>
                        <div style={{paddingLeft:'3%', paddingTop:'3%'}}>
                          <LikeUser email={person.email} />
                        </div>
                        <div style={{ display: 'block', paddingLeft:'3%' }}>
                          <div style={{fontWeight:'bold', color:'#707070'}}>{person.firstName}</div>
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

            </PerfectScrollbar>
          </div>
          <ChatRoomChannel email={id.id} />
        </div>
        <div style={{ paddingTop: '3%', color: '#8f8f8f' }}>
          <hr style={{ color: '#DBDBDB' }}></hr>
        </div>
      </div>
      <div>
        <Pagination location='/wholikesyou'/>
      </div>
      <Footer />
    </div>
  )
}

export default AllMessages

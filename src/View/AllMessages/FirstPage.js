import React, { useState, useEffect, useRef, createRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

import './index.css'
import { db, auth } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'
import ChatRoomChannel from './ChatRoomChannel'
import LikeUser from './LikeUser'

function FirstPage() {
  const [likePersons, setLikePersons] = useState([])
  const [uniqueUser, setUniqueUser] = useState([])
  const [selectUser, setSelectUser] = useState(null)
  let elementsRef
  const ref = useRef({})

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
              if (userLikeArray) {
                setTimeout(() => {
                  setLikePersons(userLikeArray)
                }, 500)
              }
            })
        }
      }
    })

    return () => {
      unsubscribe()
    }
  })
  useEffect(() => {
    if (!uniqueUser.length) {
      if (likePersons.length) {
        const likeUserEmailArray = []
        const uniqueUserArray = []
        for (let i = 0; i < likePersons.length; i++) {
          const element = likePersons[i]
          if (element && element.emailAddress) {
            if (!likeUserEmailArray.includes(element.emailAddress)) {
              likeUserEmailArray.push(element.emailAddress)
              uniqueUserArray.push(element)
            }
          }
        }
        // elementsRef = useRef(uniqueUserArray.map(() => createRef()))
        if (uniqueUserArray.length) {
          setUniqueUser(uniqueUserArray)
        }
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
            height: '400px'
          }}>
          <div
            className='scrollDiv'
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
                uniqueUser.map((person, index) => {
                  if (person) {
                    return (
                      <button
                        ref={(element) => (ref.current[index] = element)}
                        key={index}
                        onClick={() => {
                          setSelectUser(person.emailAddress)
                          document
                            .querySelectorAll('.highlight')
                            .forEach((item, key) => {
                              item.classList.remove('highlight')
                            })
                          ref.current[index].className = 'highlight'
                        }}
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          backgroundColor: '#DBDBDB',
                          marginTop: '5%',
                          borderRadius: '7px',
                          height: '60px',
                          cursor: 'pointer',
                          // outlineborder: 'solid 2px',
                          outlineColor: '#8f8f8f',
                          borderColor: 'transparent',
                          width: '100%',
                          textAlign: 'left'
                        }}>
                        <div style={{ paddingLeft: '3%', paddingTop: '3%' }}>
                          <LikeUser email={person.emailAddress} />
                        </div>
                        <div
                          style={{
                            display: 'block',
                            paddingLeft: '3%',
                            paddingTop: '4%'
                          }}>
                          <div style={{ fontWeight: 'bold', color: '#707070' }}>
                            {person.firstName}
                          </div>
                          <div style={{ display: 'flex', color: '#707070' }}>
                            {person.yourGender}, {person.years}, {person.city},{' '}
                            {person.state}, {person.country}
                          </div>
                        </div>
                      </button>
                    )
                  }
                })
              ) : (
                <></>
              )}
            </PerfectScrollbar>
          </div>
          <ChatRoomChannel email={selectUser} />
        </div>
        <div style={{ paddingTop: '3%', color: '#8f8f8f' }}>
          <hr style={{ color: '#DBDBDB' }}></hr>
        </div>
      </div>
      <div>
        <Pagination location='/wholikesyou' />
      </div>
      <Footer />
    </div>
  )
}

export default FirstPage

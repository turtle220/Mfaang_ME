import React, { useState, useEffect, useRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Avatar, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import './index.css'
import { db, auth, storage } from '../../firebase'
import Footer from '../../components/Footer/index'
import Navbar from '../../components/Navbar/index'
import Pagination from '../../components/Pagination/index'
import Delete from '../../images/button-delete.svg'
import LikeUser from './LikeUser'

function WhoLikesYou() {
  const dispatch = useDispatch()

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
                    userLikeArray.push({ person: doc.data(), id: doc.id })
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

  console.log(likePersons, '------likePersons:')
  return (
    <div>
      <Navbar />

      <div>
        <div style={{ paddingLeft: '10%', width: '90%', paddingTop: '5%' }}>
          <span
            style={{
              fontSize: '26px',
              fontFamily: 'system-ui',
              fontWeight: '700',
              color: '#0000008a'
            }}>
            Who likes you{' '}
          </span>
        </div>
        <div
          style={{
            paddingLeft: '10%',
            width: '90%',
            paddingTop: '3%',
            color: '#8f8f8f'
          }}>
          <hr style={{ color: '#8f8f8f' }}></hr>
        </div>
        {likePersons.length ? (
          likePersons.map(({ person, id }) => {
            // if (person) {
            const onDelete = () => {
              alert('Are you sure you want to delete this user?')
              db.collection('UserProfile')
                .doc(auth.currentUser.email)
                .collection('wholikesyou')
                .get()
                .then((snapshot) => {
                  snapshot.docs.map((doc) =>
                    db
                      .collection('UserProfile')
                      .doc(auth.currentUser.email)
                      .collection('wholikesyou')
                      .doc(doc.id)
                      .get()
                      .then((doc) => {
                        // remove the like user email on my profile
                        if (
                          person.email === doc.data().likeUserEmail ||
                          person.emailAddress === doc.data().likeUserEmail
                        ) {
                          db.collection('UserProfile')
                            .doc(auth.currentUser.email)
                            .collection('wholikesyou')
                            .doc(doc.id)
                            .delete()
                        }
                        // remove the auth user email on likeuser profile
                        const likeUser = doc.data().likeUserEmail;

                        db.collection('UserProfile')
                        .doc(likeUser)
                        .collection('wholikesyou')
                        .get()
                        .then((snapshot) => {
                          snapshot.docs.map((doc) => {
                              if(auth.currentUser.email === doc.data().likeUserEmail) {
                                db.collection('UserProfile')
                                .doc(likeUser)
                                .collection('wholikesyou')
                                .doc(doc.id)
                                .delete()
                              }
                            })
                          })
                      })
                  )
                })

              setTimeout(() => {
                window.location.reload()
              }, 5000)
            }

            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  paddingLeft: '10%',
                  width: '90%',
                  height: 40,
                  paddingTop: '3%',
                  paddingBottom: '5%'
                }}>
                <div style={{ width: '75%', display: 'flex' }}>
                  <LikeUser email={person.email} id={id} />
                  <div
                    style={{
                      paddingTop: '5%',
                      paddingLeft: '3%',
                      color: '#8f8f8f',
                      display: 'flex'
                    }}>
                    <p>
                      {' '}
                      {person.firstName}, {person.yourGender}, {person.years},{' '}
                      {person.city}, {person.state}, {person.country}{' '}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    justifyContent: 'space-between',
                    width: '25%',
                    display: 'flex',
                    paddingTop: '3%'
                  }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='medium'
                    href={`/allmessages/${person.email}`}
                    style={{
                      backgroundColor: '#F699CD',
                      minWidth: '200px',
                      maxWidth: '200px',
                      height: '40px'
                    }}>
                    {/* <AllMEessage/> */}
                    MESSAGE
                  </Button>
                  <div style={{ paddingTop: '1%' }}>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={onDelete}>
                      <img src={Delete} alt='' style={{ height: 40 }} />
                    </a>
                  </div>
                </div>
              </div>
            )
            // }
          })
        ) : (
          <></>
        )}

        <Pagination location={`/all`} />
      </div>
      <Footer />
    </div>
  )
}

export default WhoLikesYou

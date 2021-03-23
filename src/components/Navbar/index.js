import React, { useState, useEffect } from 'react'
// import Modal from '@material-ui/core/Modal';
import { Avatar, Button } from '@material-ui/core'
import $ from 'jquery'

import './index.css'
import { db, auth, storage } from '../../firebase'
import LogoOne from '../../images/Logo-one.svg'
import HeaderConsoleCode from '../../images/Header-consolecode.svg'
import DropDown from '../DropDown/index'

export default function Navbar() {
  const [emailVerified, setEmailVerified] = useState('')
  const [userName, setUsername] = useState('')
  const [user, setUser] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    const authUser = auth.currentUser
    if (authUser !== null) {
      setEmailVerified(authUser.emailVerified)
    }
  }, [emailVerified])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        // const authUser = auth.currentUser;
        // if (authUser !== null) {
        setEmailVerified(authUser.emailVerified)
        setUser(authUser)

        if (authUser.email) {
          storage
            .ref(`avatars/${authUser.email}-avatar.png`)
            .getDownloadURL()
            .then((url) => {
              setImage(url)
            })
            .catch(function (error) {
              console.error('There is not existing the avatar! ', error)
            })

          db.collection('UserProfile')
            .doc(authUser.email)
            .get()
            .then((doc) => {
              if(doc.data()['firstName']) {
                setUsername(doc.data()['firstName'])
              } else {
                setUsername(doc.data()['username'])
              }
            })
            .catch((err) => {
              console.log('getting username error!', err.message)
            })
        }
      } else {
        // user logged out
        setEmailVerified(false)
        setUser(null)
      }
      // db.collection('UserProfile')
      //   .orderBy('timestamp', 'desc')
      //   .onSnapshot((snapshot) => {
      //     //every time a new post is added, it fires up onSnapshot
      //     setPosts(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         post: doc.data(),
      //       }))
      //     );
      //   });
    })

    return () => {
      unsubscribe()
    }
  }, [emailVerified])

  const showFileInput = () => {
    $('#avatar_files').trigger('click')
  }
  const handleChangeAvatar = (e) => {
    if (e.target.files.length) {
      const files = e.target.files
      photoUpload(files)
    }
  }
  const photoUpload = (image) => {
    const uploadTask = storage
      .ref(`avatars/${user.email}-avatar.png`)
      .put(image[0])
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref(`avatars/${user.email}-avatar.png`)
          .getDownloadURL()
          .then((url) => {
            setImage(url)
          })
          .catch(function (error) {
            console.error('There is not existing the avatar! ', error)
          })
      }
    )
  }

  return (
    <div className='app_header'>
      <a href='/' style={{ paddingLeft: '10%', height: '50px', paddingTop: '9px' }}>
        <img
          src={LogoOne}
          alt=''
          
        />
      </a>
      <img src={HeaderConsoleCode} alt='' className='header_console' />
      {emailVerified ? (
        <div className='info_avatar'>
            <Avatar
              alt=''
              src={image ? image : null}
              onClick={showFileInput}
              style={{ cursor: 'pointer' }}
            />
          <input
            type='file'
            id='avatar_files'
            style={{ display: 'none' }}
            onChange={handleChangeAvatar}
          />

          <div className='dropdown_menu'>
            <p
              style={{
                fontFamily: 'system-ui',
                color: '#8F8F8F',
                fontSize: '16px'
              }}>
              {userName}
            </p>
            <DropDown
              onLogOut={() => {
                setEmailVerified(false)
                auth.signOut()
                setUsername(null)
                setUser(null)
              }}
            />
          </div>
        </div>
      ) : (
        <div className='app_logincontainer'>
          <div className='login_button'>
            <Button
              variant='contained'
              color='secondary'
              size='medium'
              style={{
                backgroundColor: '#F699CD',
                minWidth: '100px',
                maxWidth: '120px'
              }}
              href='/login'>
              Log In
            </Button>
            {/* <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <Login
              openSignup={() => {
                setOpenSignIn(false);
                setOpenSignUp(true);
              }}
            />
          </Modal> */}
          </div>
          <div className='signup_button'>
            <Button
              variant='contained'
              color='secondary'
              size='medium'
              style={{
                backgroundColor: '#F699CD',
                minWidth: '100px',
                maxWidth: '120px'
              }}
              href='/signup'
              // onClick={() => setOpenSignUp(true)}
            >
              Sign Up
            </Button>
            {/* <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
            <SignUp
              openLogin={() => {
                setOpenSignUp(false);
                setOpenSignIn(true);
              }}
            />
          </Modal> */}
          </div>
        </div>
      )}
    </div>
  )
}

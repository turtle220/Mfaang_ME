import React, { useState, useEffect } from 'react'
import { Avatar, Button, Input } from '@material-ui/core'
import firebase from 'firebase'

import { db, auth, storage } from '../../firebase'
import './index.css'
import { LaptopWindowsOutlined } from '@material-ui/icons'

// let flag = true
let progress

export default function Photos({ user }) {
  const [posts, setPosts] = useState([])

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

    // console.log('----posts:', posts);
    return () => {
      unsubscribe()
    }
  }, [posts])

  const postImage = () => {
    document
      .getElementById('image_files')
      .addEventListener('change', handleChangeImage, false)
    document.getElementById('image_files').click()
  }

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const files = e.target.files
      imageUpload(files[0])
    }
  }

  const imageUpload = (image) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Progress: ${progress}%`)
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            //  alert('file uploading...')
          }
          if (progress === 100) {
            alert('file upload successful')
          }
        },
        (error) => {
          console.log(error)
          alert(error.message)
        },
        () => {
          //complete function
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post image inside db
              db.collection('post')
                // .doc(user.email)
                .add({
                  imageUrl: url,
                  userEmail: user.email,
                  imageName: image.name,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        }
      )
    } else {
      alert('Please choose the file to upload!')
    }
  }

  if (progress === 100) {
    setTimeout(() => window.location.reload(), 1000)
  }
  return (
    <div className='photos'>
      <div
        style={{
          textAlign: 'center',
          paddingLeft: '15%',
          paddingRight: '15%',
          paddingTop: '3%'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* section 1 */}
          {posts.length &&
          posts[0] &&
          user.email === posts[0].post.userEmail ? (
            <img
              src={posts[0].post.imageUrl}
              style={{ width: '150px', height: '100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px'
              }}></div>
          )}
          {/* section 2 */}
          {posts.length &&
          posts[1] &&
          user.email === posts[1].post.userEmail ? (
            <img
              src={posts[1].post.imageUrl}
              style={{ width: '150px', height: '100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px'
              }}></div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '3%',
            paddingBottom: '3%'
          }}>
          {/* section 3 */}
          {posts.length &&
          posts[2] &&
          user.email === posts[2].post.userEmail ? (
            <img
              src={posts[2].post.imageUrl}
              style={{ width: '150px', height: '100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px'
              }}></div>
          )}
          {/* section 4 */}
          {posts.length &&
          posts[3] &&
          user.email === posts[3].post.userEmail ? (
            <img
              src={posts[3].post.imageUrl}
              style={{ width: '150px', height: '100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px'
              }}></div>
          )}
        </div>
      </div>
      <div style={{ paddingBottom: '3%' }}>
        <Button
          variant='contained'
          color='secondary'
          style={{
            backgroundColor: '#F699CD',
            minWidth: '100px',
            maxWidth: '100%',
            width: '70%'
          }}
          onClick={postImage}>
          UPLOAD PHOTOS
        </Button>
        <input type='file' id='image_files' style={{ display: 'none' }} />
      </div>

      {/* <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h5 className="text-center">Upload your photo</h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button> */}
    </div>
  )
}

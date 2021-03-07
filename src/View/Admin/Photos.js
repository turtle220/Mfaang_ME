import React, { useState, useEffect } from 'react'
import { Avatar, Button, Input } from '@material-ui/core'
import firebase from 'firebase'

import { db, auth, storage } from '../../firebase'
import './index.css'
import { LaptopWindowsOutlined } from '@material-ui/icons'

let progress
let imgUrlArray = [{ url: '' }]

export default function Photos({ user }) {
  const [posts, setPosts] = useState([])
  // const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!posts.length) {
        db.collection('post')
          .orderBy('timestamp', 'desc')
          .get()
          .then((snapshot) => {
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
    // imgUrlArray = null;
    imgUrlArray = [{ url: '' }]
    console.log('----postImage')
    document
      .getElementById('image_files')
      .addEventListener('change', handleChangeImage, false)
    document.getElementById('image_files').click()
  }

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const files = e.target.files
      console.log(files[0], '-----------Upload function:')
      imageUpload(files[0])
    }
  }

  const imageUpload = (image) => {
    if (image) {
      // console.log(image, '------image:')
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      // const imgUrlArray = [{}]

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Progress: ${progress}%`)
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            //  alert('file uploading...')
          }
          // if (progress === 100) {
          // alert('file upload successful')
          // }
        },
        (error) => {
          console.log(error)
          alert(error.message)
        },
        () => {
          // complete function
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // imgUrlArray.push(url);
              // imgUrlArray = url
              // setImgUrl(url)
              // imgUrl = url;
              // post image inside db

              db.collection('post')
                .add({
                  imageUrl: url,
                  userEmail: user.email,
                  // imageName: image.name,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) => {
                  db.collection('post').doc(docRef.id).get()
                    .then((doc) => {
                      //every time a new post is added, it fires up onSnapshot
                      setPosts([...posts, {id: doc.id, post: doc.data()}])
                    })
                })
              // console.log('---------url:', url)
              // setImgUrl(url)
            })
        }
      )
    } else {
      alert('Please choose the file to upload!')
    }
  }
  // console.log(imgUrlArray, '------imgUrl:')
  // if (progress === 100) {
  //   setTimeout(() => window.location.reload(), 2000)
  // }
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
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
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
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
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
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
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
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
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
    </div>
  )
}

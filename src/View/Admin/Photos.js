import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input } from '@material-ui/core';
import firebase from 'firebase';

import { db, auth, storage } from '../../firebase';
import './index.css';

export default function Photos({ user }) {
  // const [image, setImage] = useState({ preview: '', raw: '' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // if (authUser) {

      //   if (authUser.email) {
      //     storage
      //       .ref(`avatars/${authUser.email}-avatar.png`)
      //       .getDownloadURL()
      //       .then((url) => {
      //         // setImage(url);
      //       });
      //       db.collection('UserProfile')
      //       .doc(authUser.email)
      //       .get()
      //       .then((doc) => {
      //         // setUsername(doc.data()['username']);
      //         // setCountry(doc.data()['country']);
      //       })
      //       .catch((err) => {
      //         console.log('getting username error!', err.message);
      //       });
      //   }
      // } else {
      //   //user logged out
      //   // setUser(null);
      // }
      if (!posts.length) {
        db.collection('post')
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            //every time a new post is added, it fires up onSnapshot
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
              }))
            );
          });
      }
    });

    // console.log('----posts:', posts);

    return () => {
      unsubscribe();
    };
  }, [posts]);

  const postImage = () => {
    document
      .getElementById('image_files')
      .addEventListener('change', handleChangeImage, false);
    document.getElementById('image_files').click();
  };
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const files = e.target.files;
      imageUpload(files[0]);
    }
  };
  const imageUpload = (image) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          //progress function
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
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
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  // caption: $('.caption_input').val(),
                  // username: username ? username : '',
                  // useremail: user.email,
                  // imagename: image.name,
                  // country: country,
                });
            });
        }
      );
    } else {
      alert('Please choose the file to upload!');
    }
  };

  // const handleChange = (e) => {
  //   if (e.target.files.length) {
  //     setImage({
  //       preview: URL.createObjectURL(e.target.files[0]),
  //       raw: e.target.files[0],
  //     });
  //   }
  // };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', image.raw);

  //   await fetch('YOUR_URL', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData,
  //   });
  // };
  return (
    <div className='photos'>
      <div
        style={{
          textAlign: 'center',
          paddingLeft: '15%',
          paddingRight: '15%',
          paddingTop: '3%',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* section 1 */}
          {posts.length ? (
            <img
              src={posts[0].post.imageUrl}
              style={{ width: '150px', height:'100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px',
              }}></div>
          )}
          {/* section 2 */}
          {posts.length ? (
            <img
              src={posts[1]?.post.imageUrl}
              style={{ width: '150px', height:'100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px',
              }}></div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '3%',
            paddingBottom: '3%',
          }}>
          {/* section 3 */}
          {posts.length ? (
            <img
              src={posts[2]?.post.imageUrl}
              style={{ width: '150px', height:'100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px',
              }}></div>
          )}
          {/* section 4 */}
          {posts.length ? (
            <img
              src={posts[3]?.post.imageUrl}
              style={{ width: '150px', height:'100px' }}
              alt=''
            />
          ) : (
            <div
              style={{
                backgroundColor: '#F8F8F8',
                width: 150,
                height: 100,
                borderRadius: '5px',
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
            width: '70%',
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
  );
}

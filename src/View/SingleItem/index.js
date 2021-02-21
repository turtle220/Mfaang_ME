import React, { useState, useEffect, useRef } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './index.css';
import { db, auth, storage } from '../../firebase';
import Footer from '../../components/Footer/index';
import Navbar from '../../components/Navbar/index';
import MembersFrom from '../../images/Home/MembersFrom.svg';
import imageTest1 from '../../images/test(1).jpg';
import Post from './post';

function Meet() {
  const ps = useRef();
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

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

  return (
    <div>
      <Navbar />
      <div>
        <div
          style={{
            backgroundColor: 'white',
            paddingLeft: '10%',
            display: 'block',
            paddingTop: '5%',
          }}>
          <div>
            <span
              style={{
                fontSize: '30px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#0000008a',
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
            height: '720px',
            overflowY: 'auto',
          }}>
          <PerfectScrollbar containerRef={(el) => (ps.current = el)}>
            {posts.length
              ? posts.map(({ id, post }) => {
                  return <Post id={id} post={post} />;
                })
              : null}
            {/* <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div>
            <div className='gallery'>
              <div style={{ height: 200, width: '100%', background: '#EEE' }}>
                <img
                  src={imageTest1}
                  style={{ width: '100%', height: 200 }}
                  alt=''
                />
              </div>
              <div className='desc'>Add a description of the image here</div>
            </div> */}
          </PerfectScrollbar>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Meet;

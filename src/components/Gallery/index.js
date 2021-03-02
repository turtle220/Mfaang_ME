import React, { useState, useEffect } from 'react'
import ItemsCarousel from 'react-items-carousel'

import imageTest1 from '../../images/test(1).jpg'
import NextButtonIcon from '../../images/Home/NextButton.svg'
import BackButtonIcon from '../../images/Home/BackButton.svg'
import { db, auth, storage } from '../../firebase'
import SingleImage from './SingleImage'

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 20
  const [posts, setPosts] = useState([])
  const [userProfile, setUserProfile] = useState([])

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

  return (
    <div
      style={{
        padding: `0 ${chevronWidth}px`,
        paddingTop: '3%',
        maxWidth: '90%'
      }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={10}
        leftChevron={<img src={BackButtonIcon} alt='' />}
        rightChevron={<img src={NextButtonIcon} alt='' />}
        outsideChevron
        chevronWidth={chevronWidth}>
        {posts.length
          ? posts.map(({ id, post }) => {
              return (
                <div style={{ height: 270, width: '100%', background: '#EEE' }}>
                  <SingleImage key={id} id={id} post={post} />
                </div>
              )
            })
          : null}
        {/* <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}>
          <img src={imageTest1} style={{ width: '100%', height: 270 }} alt='' />
        </div> */}
        {/* <div style={{ height: 200, background: '#EEE' }}></div>
        <div style={{ height: 200, background: '#EEE' }}></div>
        <div style={{ height: 200, background: '#EEE' }}> </div>
        <div style={{ height: 200, background: '#EEE' }}> </div>
        <div style={{ height: 200, background: '#EEE' }}> </div> */}
      </ItemsCarousel>
    </div>
  )
}

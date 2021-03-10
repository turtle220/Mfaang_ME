import React, { useState, useEffect } from 'react'
import ItemsCarousel from 'react-items-carousel'

import NextButtonIcon from '../../images/Home/NextButton.svg'
import BackButtonIcon from '../../images/Home/BackButton.svg'
import { db, auth } from '../../firebase'
import SingleImage from './SingleImage'

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 20
  const [posts, setPosts] = useState([])
  const [uniqueUser, setUniqueUser] = useState([])

  //Unique Function
  useEffect(() => {
    if (!uniqueUser.length) {
      if (posts.length) {
        const postEmailArray = []
        const uniqueUserArray = []
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i]
          if (!postEmailArray.includes(element.post.userEmail)) {
            postEmailArray.push(element.post.userEmail)
            uniqueUserArray.push(element)
          }
        }
        setUniqueUser(uniqueUserArray)
      }
    }
  })

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
        {uniqueUser.length
          ? uniqueUser.map(({ id, post }) => {
              return (
                <div key={id} style={{ height: 270, width: '100%', background: '#EEE' }}>
                  <SingleImage key={id} id={id} post={post} />
                </div>
              )
            })
          : null}
      </ItemsCarousel>
    </div>
  )
}

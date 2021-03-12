import React, { useState, useEffect } from 'react'

import { db } from '../../firebase'

function SingleImage({ id, post }) {

  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (post.userEmail && post) {
      if (!userProfile) {
        db.collection('UserProfile')
          .doc(post.userEmail)
          .get()
          .then((doc) => {
            setUserProfile(doc.data())
          })
          .catch((err) => {
            console.log('getting username error!', err.message)
          })
      }
    }
  }, [userProfile])

  return (
    <div style={{height: '250px', backgroundColor: '#DBDBDB', boxShadow:'8px 10px 5px #88888f'}}>
      <a style={{ color: '#8F8F8F' }} href={`/singleitem/${id}`}>
        <img
          key={id}
          src={post.imageUrl}
          style={{ width: '100%', height: 230, objectFit:'cover', borderColor:'#8f8f8f00', borderStyle: 'solid', borderWidth: '10px 10px 10px' }}
          alt=''
        />
      </a>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-10px'
        }}>
        <p style={{ color: '#8F8F8F', whiteSpace: 'nowrap', fontFamily: "Segoe Script", fontWeight: 'bold' }}>
          {userProfile ? userProfile.firstName : ''}
        </p>
      </div>
    </div>
  )
}

export default SingleImage

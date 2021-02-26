import React, { useRef, useState } from 'react'
import './index.css'

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { db, auth, storage } from '../../firebase'
import firebase from 'firebase'
import PostButton from '../../images/button-post.svg'

// const auth = firebase.auth();
const firestore = firebase.firestore()
// const analytics = firebase.analytics();

function ChatRoomChannel() {
  const [user] = useAuthState(auth)

  return (
    <div className='App' style={{ paddingLeft: '5%', paddingTop: '2%', width:'100%' }}>
      <section>
        <ChatRoom />
      </section>
    </div>
  )
}

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main style={{ height: '250px' }}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something nice'
          className='post_input'
        />

        <button type='submit' disabled={!formValue} className="post_button">
          <img src={PostButton} alt="" style={{width:'22px'}}/>
        </button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`} >
        {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
        <p>{text}</p>
      </div>
    </>
  )
}

export default ChatRoomChannel

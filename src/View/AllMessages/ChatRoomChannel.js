import React, { useEffect, useRef, useState } from 'react'
import './index.css'

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { db, auth, storage } from '../../firebase'
import firebase from 'firebase'
import PostButton from '../../images/button-post.svg'

const firestore = firebase.firestore()

function ChatRoomChannel(email) {
  const [user] = useAuthState(auth)

  return (
    <div className='App' style={{ paddingTop: '2%', width: '100%' }}>
      <section>
        {/* <PerfectScrollbar> */}
        <ChatRoom email={email} />
        {/* </PerfectScrollbar> */}
      </section>
    </div>
  )
}

function ChatRoom(email) {
  // const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt')

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')
  const [messagesId, setMessagesId] = useState([])
  const [sendChattingUser, setSendChattingUser] = useState(null)
  const [getChattingUser, setGetChattingUser] = useState(false)

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL, displayName } = auth.currentUser
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let newformat = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    // To display "0" as "12"
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let getCurrentTime = hours + ':' + minutes + ' ' + newformat

    await messagesRef.add({
      user: displayName,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      to: email.email,
      from: auth.currentUser.email,
      currentTime: getCurrentTime
    })

    setFormValue('')
  }

  //set messageId
  // useEffect(() => {
  //   if (!messagesId.length) {
  //     db.collection('messages')
  //       .orderBy('timestamp', 'desc')
  //       .onSnapshot((snapshot) => {
  //         setMessagesId(
  //           snapshot.docs.map((doc) => ({
  //             messageId: doc.id,
  //             message: doc.data()
  //           }))
  //         )
  //       })
  //   }
  // }, )
  // send chattingUser
  // useEffect(() => {
  //   if (!sendChattingUser && messages) {
  //     messages.map((message) => {
  //       if (message.id && message.to && message.to.email) {
  //         if (email.email.email === message.to.email) {
  //           // db.collection('messages')
  //           //   .doc(message.id)
  //           //   .get()
  //           //   .then((doc) => {
  //           //     // console.log(doc.data(), 'sendChattingUserDOCDATA:')
  //           //     setSendChattingUser(doc.data())
  //           //   })
  //         }
  //       }
  //     })
  //   }
  // })

  // // get ChattingUser
  // useEffect(() => {
  //   if (!getChattingUser && messages) {
  //     messages.map((message) => {
  //       if (message.id && message.to && message.to.email && message.from) {
  //         console.log(
  //           email.email.email,
  //           message.to.email,
  //           message.from,
  //           auth.currentUser.email,
  //           '----messages:'
  //         )

  //         if (
  //           email.email.email === message.to.email &&
  //           message.from === auth.currentUser.email
  //         ) {
  //           db.collection('messages')
  //             .doc(message.id)
  //             // .orderBy('timestamp', 'desc')
  //             .get()
  //             .then((doc) => {
  //               // if (
  //               //   // auth.currentUser.email === messageId.message.from.email &&
  //               //   messageId.message.from.email !== email.email.email
  //               // ) {
  //               // console.log(doc.data(), 'sendChattingUserDOCDATA:')
  //               // }
  //             })
  //           setGetChattingUser(true)
  //         }
  //       }
  //     })
  //   }
  // })

  // if (getChattingUser)
  //   console.log(
  //     email.email.email,
  //     // sendChattingUser,
  //     getChattingUser,
  //     '----getChattingUseremail:'
  //   )

  return (
    <>
      {
        <main>
          <div
            style={{ overflowY: 'auto', height: '355px', paddingLeft: '1%' }}>
            <PerfectScrollbar>
              {messages &&
                messages.map((msg) => {
                  if (
                    (email.email.email === msg.to.email &&
                      msg.from === auth.currentUser.email) ||
                    (msg.from === email.email.email &&
                      msg.to.email === auth.currentUser.email)
                  ) {
                    return <ChatMessage key={msg.id} message={msg} />
                  }
                })}
            </PerfectScrollbar>
          </div>
        </main>
      }

      <form onSubmit={sendMessage}>
        <div style={{display:'flex', outline: 'none', backgroundColor: 'white', border: 'none', borderTop: 'solid 1px lightgray'}}>
          <div style={{width:'90%'}}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder='say something nice'
              className='post_input'
            />
          </div>
          <div style={{width:'10%', textAlign:'center'}}>
            <button type='submit' disabled={!formValue} className='post_button'>
              <img src={PostButton} alt='' style={{ width: '23px' }} />
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL, user, currentTime } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
  return (
    <div>
      <div className={`message ${messageClass}`}>
        <div className='messagecontent'>
          <p
            style={{
              backgroundColor: 'transparent',
              color: '#8F8F8F',
              width: '10%'
            }}>
            {currentTime}
          </p>
          <div className='receivedtext'>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoomChannel

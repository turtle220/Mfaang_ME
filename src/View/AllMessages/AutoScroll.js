import React, { useState, useEffect, useRef } from 'react'

function ChatRoom() {
    const dummy = useRef();
  
    useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
  
      </main>
    </>)
  }
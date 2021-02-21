import React, { useState, useEffect, useRef } from 'react';

import { db, auth, storage } from '../../firebase';
import './index.css';

export default function DropDownMenu({onLogOut}) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className='container' ref={container}>
      <button type='button' class='button' onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div class='dropdown-wrapper'>
          <ul class='dropdown-menu'>
            <li class='dropdown-menu__item' ><a href='/admin' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Account</a></li>
            <li class='dropdown-menu__item' ><a href='/message' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Message</a></li>
            <li class='dropdown-menu__item' ><a href='/wholikeyou' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Who likes you</a></li>
            <li class='dropdown-menu__item' ><a href='/meet' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Meet others</a></li>
            <li class='dropdown-menu__item' ><a href='/' style={{textDecoration:'none', fontFamily: 'system-ui',color:'#8F8F8F'}} onClick={()=>{onLogOut();auth.signOut();}}>Log out</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

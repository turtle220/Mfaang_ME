import React, { useState, useEffect, useRef } from 'react';

import { auth } from '../../firebase';
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
    <div className='container' ref={container} style={{margin:0}}>
      <button type='button' className='button' onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className='dropdown-wrapper'>
          <ul className='dropdown-menu'>
            <li className='dropdown-menu__item' ><a href='/admin' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Account</a></li>
            <li className='dropdown-menu__item' ><a href='/all' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Message</a></li>
            <li className='dropdown-menu__item' ><a href='/wholikesyou' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Who likes you</a></li>
            <li className='dropdown-menu__item' ><a href='/meet' style={{textDecoration:'none', fontFamily: 'system-ui', color:'#8F8F8F'}}>Meet others</a></li>
            <li className='dropdown-menu__item' ><a href='/' style={{textDecoration:'none', fontFamily: 'system-ui',color:'#8F8F8F'}} onClick={()=>{onLogOut();auth.signOut();}}>Log out</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

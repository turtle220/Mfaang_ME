import React from 'react';

import ContactTop from '../../images/Contact/Contact-Top.svg';
import ContactLeftCode from '../../images/Contact/Contact-LeftCode.svg';
import ContactRightCode from '../../images/Contact/Contact-RightCode.svg';
import ButtonBack from '../../images/button-back.svg';
import LogoTwo from '../../images/Logo-two.svg';

import './index.css';

function Contact() {
  return (
    <div className='app'>
      <img
        style={{ width: '100%', margin: '0 auto' }}
        src={ContactTop}
        alt=''
      />

      <div style={{ display: 'flex' }}>
        <a className='nav-bar' href='/'>
          <img src={ButtonBack} alt='' />{' '}
          <p style={{ fontSize: 23, fontWeight: 'bold', marginTop: '-3px' }}>
            Back
          </p>
        </a>
        <img
          src={LogoTwo}
          alt=''
          style={{ position: 'fixed', top: '5%', left: '80%' }}
        />
      </div>

      <div className='footer-etc'>
        <div style={{ paddingLeft: '10%', display: 'block' }}>
          <div style={{ display: 'flex', paddingTop: '10%' }}>
            <img src={ContactLeftCode} alt='' style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'block' }}>
          <div
            style={{ paddingLeft: '3%', display: 'flex', paddingTop: '10%' }}>
            <img src={ContactRightCode} alt='' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

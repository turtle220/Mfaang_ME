import React from 'react';

import CancellationTop from '../../images/Cancellation/Cancellation-Top.svg';
import CancellationLeftCode from '../../images/Cancellation/Cancellation-LeftCode.svg';
import CancellationRightCode from '../../images/Cancellation/Cancellation-RightCode.svg';
import ButtonBack from '../../images/button-back.svg';
import LogoTwo from '../../images/Logo-two.svg';

import './index.css';

function Cancellation() {
  return (
    <div className='app'>
      <img
        style={{ width: '100%', margin: '0 auto' }}
        src={CancellationTop}
        alt=''
      />

      <div style={{ display: 'flex' }}>
        <a className='nav-bar' href='/'>
          <img src={ButtonBack} alt='' />{' '}
          <p style={{ fontSize: 23, fontWeight: 'bold', marginTop: '18px' }}>
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
            <img src={CancellationLeftCode} alt='' style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'block' }}>
          <div
            style={{ paddingLeft: '3%', display: 'flex', paddingTop: '10%' }}>
            <img src={CancellationRightCode} alt='' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancellation;

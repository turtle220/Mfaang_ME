import React from 'react';
import { Avatar, Button } from '@material-ui/core';

import './index.css';
import LogoOne from '../../images/Logo-one.svg';
import HeaderConsoleCode from '../../images/Header-consolecode.svg';

export default function Navbar() {
  return (
    <div className='app_header'>
      <img src={LogoOne} alt='' style={{ paddingLeft: '10%', height:'50px', paddingTop:'9px' }} />
      <img src={HeaderConsoleCode} alt=''style={{marginLeft:'-20%'}} />

      <div className='app_logincontainer'>
        <div className='login_button'>
          <Button
            variant='contained'
            color='secondary'
            size='medium'
            style={{
              backgroundColor: '#F699CD',
              minWidth: '100px',
              maxWidth: '120px',
            }}
            // onClick={() => setOpenSignIn(true)}
            >
            Log In
          </Button>
          {/* <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <Login
              openSignup={() => {
                setOpenSignIn(false);
                setOpen(true);
              }}
            />
          </Modal> */}
        </div>
        <div className='signup_button'>

          <Button
            variant='contained'
            color='secondary'
            size='medium'
            style={{
              backgroundColor: '#F699CD',
              minWidth: '100px',
              maxWidth: '120px',
            }}
            // onClick={() => setOpen(true)}
            >
            Sign Up
          </Button>
          {/* <Modal open={open} onClose={() => setOpen(false)}>
            <SignUp
              openLogin={() => {
                setOpen(false);
                setOpenSignIn(true);
              }}
            />
          </Modal> */}
        </div>
      </div>
    </div>
  );
}

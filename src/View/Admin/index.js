import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button } from '@material-ui/core';
import $ from 'jquery';
import firebase from 'firebase';

import { db, auth, storage } from '../../firebase';
import Footer from '../../components/Footer/index';
import Navbar from '../../components/Navbar/index';
import Account from './Account';

function Admin() {
  const [emailVerified, setEmailVerified] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        setEmailVerified(authUser.emailVerified);
        setUser(authUser);
        // console.log(authUser.emailVerified,'---Aadmin:')
      } else {
        //user logged out
        setEmailVerified(false);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [emailVerified]);

  return (
    <div className='app'>
      <Navbar />
      {emailVerified && <Account user={user}/> }
      <Footer />
    </div>
  );
}

export default Admin;

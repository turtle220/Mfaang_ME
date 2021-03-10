import React, { useState, useEffect } from 'react';

import { auth } from '../../firebase';
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

import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../../firebase';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import $ from 'jquery';
import { Avatar, Button, Input } from '@material-ui/core';

import './index.css';
import LogoLogin from '../../images/Logo-Login.svg';
import LogoPictures from '../../images/Logo-Pictures.svg';

export default function SignUp({ openLogin }) {
  const history = useHistory();

  const onLogin = (evt) => {
    const email = $('.email_address').val();
    const password = $('.login_password').val();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // const authUser = auth.currentUser;
        // authUser.emailVerified
        console.log('logged in!', auth.currentUser.email, auth.currentUser.emailVerified);
        history.push('/');
      })
      .catch((error) => {
        console.log('login error--', error);
        alert('Incorrect username or password');
      });
  };

  return (
    <div style={{ backgroundColor: 'white', display: 'block' }}>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#F8F8F8',
          height: '580px',
        }}>
        <div style={{ display: 'block', padding: '7%', width: '52.5%' }}>
          <p
            style={{
              fontSize: '26px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a',
            }}>
            WHY WAIT AND SWIPE ALL DAY
          </p>
          <p
            style={{
              fontSize: '30px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a',
            }}>
            Put yourself out there and see who you can meet and have a wonderful
            time together
          </p>
        </div>
        <div
          className='login_card_form login_card-1'
          onKeyDown={(e) => {
            if (e.key === 'Enter') onLogin();
          }}>
          <div style={{ padding: '3%' }}>
            <img
              src={LogoLogin}
              alt=''
              style={{ marginTop: '-9%', width: '30%' }}
            />
            <p
              style={{
                fontSize: '15px',
                color: '#8F8F8F',
                width: '100%',
                fontFamily: 'system-ui',
              }}>
              LOG IN HERE AND ENJOY
            </p>
            <div
              style={{
                paddingTop: '3%',
                height: '48px',
                width: '100%',
                margin: '0, auto',
              }}>
              <input
                placeholder='Email Address'
                className='email_address'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '100%',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <br></br>
              <br></br>
              <input
                placeholder='Password'
                className='login_password'
                type='password'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '100%',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: 'none',
                }}></input>
              <br></br>
              <br></br>
              <Button
                variant='contained'
                color='secondary'
                style={{
                  backgroundColor: '#F699CD',
                  minWidth: '100px',
                  maxWidth: '100%',
                  width: '100%',
                }}
                type='submit'
                onClick={onLogin}>
                LOG IN
              </Button>
              <div style={{ paddingTop: '3%' }}>
                <span
                  style={{
                    paddingTop: '3%',
                    fontSize: '15px',
                    color: '#8F8F8F',
                    width: '100%',
                    fontFamily: 'system-ui',
                  }}>
                  Don't have an account?
                  <a
                    className='terms'
                    style={{
                      width: '50%',
                      color: '#F699CD',
                      cursor: 'pointer',
                    }}
                    href='/signup'>
                    {' '}
                    Sign Up
                  </a>
                </span>
                <a
                  className='terms'
                  style={{
                    float: 'right',
                    color: '#8F8F8F',
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontFamily: 'system-ui',
                  }}
                  href='/signup'>
                  {' '}
                  Forget Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={LogoPictures}
          alt=''
          style={{ paddingLeft: '7%', width: '92%' }}
        />
      </div>
    </div>
  );
}

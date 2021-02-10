import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../../firebase';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import $ from 'jquery';
import { Avatar, Button, Input } from '@material-ui/core';

import './index.css';
export default function SignUp({ openLogin }) {
  const history = useHistory();
  const onSignUp = (evt) => {
    const username = $('.user_name').val();
    const email = $('.email_address').val();
    const password = $('.signup_password').val();
    if (username && email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          await db.collection('userprofile').doc(email).set({
            username,
            email,
            address: '',
            city: '',
            country: '',
          });
          history.push('/');
        })
        .catch(async function (error) {
          console.log('SignUp error', error);
          alert(
            'This email address is already in username, please provide a different one or log in'
          );
        });
    } else {
      alert('Please fillout all forms! ');
    }
  };

  return (
    // <div style={{ justifyContent: 'center', top: '15%' }}>
    <div
      className='signup_card signup_card-1'
      style={{ top: '21%' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSignUp();
      }}>
      <div style={{ padding: '3%' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='43.635'
          height='43.43'
          viewBox='0 0 43.635 43.43'
          style={{ position: 'absolute', marginTop: '-33px' }}>
          <g
            id='Icon_ionic-md-paw'
            data-name='Icon ionic-md-paw'
            transform='translate(22.691 -10.337) rotate(47)'>
            <path
              id='Path_1'
              data-name='Path 1'
              d='M34.032,12.091a3.555,3.555,0,0,0-2.024-1.928,3.849,3.849,0,0,0-1.3-.228A5.7,5.7,0,0,0,25.9,13.58c-1.209,2.708-.508,5.345,1.63,6.16a3.938,3.938,0,0,0,1.367.245,5.764,5.764,0,0,0,4.9-3.339A5.463,5.463,0,0,0,34.032,12.091Z'
              transform='translate(8.008 1.615)'
              fill='#ff9100'></path>
            <path
              id='Path_2'
              data-name='Path 2'
              d='M11.9,13.573A5.688,5.688,0,0,0,7.091,9.928a3.811,3.811,0,0,0-1.3.228A3.581,3.581,0,0,0,3.77,12.084a5.377,5.377,0,0,0,.237,4.548A5.764,5.764,0,0,0,8.9,19.97a3.778,3.778,0,0,0,1.367-.245C12.41,18.927,13.111,16.281,11.9,13.573Z'
              transform='translate(0 1.614)'
              fill='#ff9100'></path>
            <path
              id='Path_3'
              data-name='Path 3'
              d='M14.666,14.889a3.516,3.516,0,0,0,.526-.018,4.182,4.182,0,0,0,2.681-1.253,5.927,5.927,0,0,0,1.253-4.977c-.377-2.953-2.261-5.17-4.8-5.266,0,0-.359,0-.543.018a4.57,4.57,0,0,0-2.935,1.393A5.716,5.716,0,0,0,9.347,9.5C9.724,12.427,12.055,14.793,14.666,14.889Z'
              transform='translate(2.184)'
              fill='#ff9100'></path>
            <path
              id='Path_4'
              data-name='Path 4'
              d='M21.7,15.75c-6.723,0-13.456,8.509-13.456,15.449a5.267,5.267,0,0,0,2.28,4.416,7.268,7.268,0,0,0,4.414,1.174,5.8,5.8,0,0,0,2.726-.535,8.766,8.766,0,0,1,3.871-.911h.34a8.887,8.887,0,0,1,3.871.911,5.915,5.915,0,0,0,2.726.535,7.23,7.23,0,0,0,4.414-1.174,5.291,5.291,0,0,0,2.28-4.416C35.16,24.25,28.427,15.75,21.7,15.75Z'
              transform='translate(1.201 3.047)'
              fill='#ff9100'></path>
            <path
              id='Path_5'
              data-name='Path 5'
              d='M22.772,14.859c.175.018.351.018.526.018,2.611-.1,4.951-2.454,5.328-5.389a5.688,5.688,0,0,0-1.5-4.714,4.473,4.473,0,0,0-2.9-1.367c-.184-.018-.587-.018-.587-.018-2.532.1-4.416,2.287-4.8,5.249a5.919,5.919,0,0,0,1.253,4.977A4.3,4.3,0,0,0,22.772,14.859Z'
              transform='translate(5.672 0.003)'
              fill='#ff9100'></path>
          </g>
        </svg>
        <br></br>
        <p
          style={{
            fontFamily: 'Bold',
            fontSize: '20px',
            color: '#FF9100',
            width: '100%',
          }}>
          {' '}
          SIGN UP A FREE ACCOUNT AND GET STARTED{' '}
        </p>
        <div
          style={{
            paddingTop: '3%',
            height: '48px',
            width: '100%',
            margin: '0, auto',
          }}>
          <input
            placeholder='User Name'
            className='user_name'
            style={{
              borderRadius: '5px',
              borderColor: 'rgba(0, 0, 0, 0.26)',
              height: '170%',
              paddingLeft: '4%',
              width: '100%',
              margin: '0, auto',
              outline: '#FF9100',
            }}></input>
          <br></br>
          <input
            placeholder='Email Address'
            className='email_address'
            style={{
              borderRadius: '5px',
              borderColor: 'rgba(0, 0, 0, 0.26)',
              height: '170%',
              paddingLeft: '4%',
              marginTop: '5%',
              marginBottom: '5%',
              width: '100%',
              margin: '0, auto',
              outline: 'none',
            }}></input>
          <br></br>
          <input
            placeholder='Password'
            className='signup_password'
            type='password'
            style={{
              borderRadius: '5px',
              borderColor: 'rgba(0, 0, 0, 0.26)',
              height: '170%',
              paddingLeft: '4%',
              width: '100%',
              margin: '0, auto',
              outline: 'none',
            }}></input>

          <label className='checkbox'>
            <span className='checkbox__input'>
              <input type='checkbox' name='checkbox' />
              <span className='checkbox__control'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  focusable='false'>
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    d='M1.73 12.91l6.37 6.37L22.79 4.59'
                  />
                </svg>
              </span>
            </span>
            <span className='radio__label'>
              I have accepted the{' '}
              <a className='terms' style={{ color: '#FF9100' }} href='/terms'>
                Terms and Conditions
              </a>
            </span>
          </label>
          <Button
            variant='contained'
            color='secondary'
            style={{
              backgroundColor: '#ff9100',
              minWidth: '100px',
              maxWidth: '100%',
              width: '100%',
            }}
            type='submit'
            onClick={onSignUp}>
            Sign Up Now
          </Button>
          <div style={{ paddingTop: '3%' }}>
            <span
              style={{ color: '#8F8F8F', paddingTop: '3%', fontSize: '14px' }}>
              Already have an account?{' '}
              <a
                className='terms'
                style={{ color: '#FF9100' }}
                onClick={() => {
                  openLogin();
                }}>
                Log In
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

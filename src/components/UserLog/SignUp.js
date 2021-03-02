import { Checkbox } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { db, auth, storage } from '../../firebase'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import $ from 'jquery'
import { Avatar, Button, Input } from '@material-ui/core'

import './index.css'
import LogoLogin from '../../images/Logo-Login.svg'
import LogoPictures from '../../images/Logo-Pictures.svg'

export default function SignUp({ openLogin }) {
  const [activeWelcome, setActiveWelcome] = useState(true)

  const onSignUp = (evt) => {
    const username = $('.user_name').val()
    const emails = $('input[type="text"]').val()
    const email = $('.email_address_name').val() + '@' + emails
    const password = $('.signup_password').val()

    if (username && email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          await auth.currentUser.sendEmailVerification({url: 'http://localhost:3000'}).then(function () {
            //Email sent
            // console.log('-----email sent:');
          })
          await db.collection('UserProfile').doc(email.toLowerCase()).set({
            username,
            email,
            address: '',
            city: '',
            country: ''
          })
          setActiveWelcome(false)
        })

        .catch(async function (error) {
          console.log('SignUp error', error)
          alert(
            'This email address is already in username, please provide a different one or log in'
          )
        })
    } else {
      alert('Please fillout all forms! ')
    }
  }

  return (
    <div style={{ backgroundColor: 'white', display: 'block' }}>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#F8F8F8',
          height: '580px'
        }}>
        <div style={{ display: 'block', padding: '7%', width: '52.5%' }}>
          <p
            style={{
              fontSize: '28px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a'
            }}>
            SEE HOW YOU CAN MEET AND SHARE
          </p>
          <p
            style={{
              fontSize: '30px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a'
            }}>
            Meet your fellow tech singles share stories, interests and laughs,
            enjoy life together
          </p>
        </div>
        <div
          className='signup_card_form signup_card-1'
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSignUp()
          }}>
          <div style={{ padding: '3%' }}>
            <img
              src={LogoLogin}
              alt=''
              style={{ marginTop: '-9%', width: '30%' }}
            />
            {activeWelcome ? (
              <>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#8F8F8F',
                    width: '100%',
                    fontFamily: 'system-ui'
                  }}>
                  SIGN UP A FREE ACCOUNT AND GET STARTED
                </p>
                <div
                  style={{
                    paddingTop: '3%',
                    height: '48px',
                    width: '100%',
                    margin: '0, auto'
                  }}>
                  <input
                    placeholder='User Name'
                    className='user_name'
                    style={{
                      borderRadius: '5px',
                      borderColor: 'rgba(0, 0, 0, 0.26)',
                      height: '100%',
                      paddingLeft: '4%',
                      width: '100%',
                      margin: '0, auto',
                      outline: '#FF9100'
                    }}></input>
                  <br></br>
                  <div style={{ display: 'flex', height: '67px' }}>
                    <input
                      placeholder='Email Address'
                      className='email_address_name'
                      style={{
                        borderRadius: '5px',
                        borderColor: 'rgba(0, 0, 0, 0.26)',
                        height: '32px',
                        paddingLeft: '4%',
                        marginTop: '5%',
                        marginBottom: '5%',
                        width: '95%',
                        margin: '0, auto',
                        outline: 'none'
                      }}></input>
                    <span
                      style={{
                        paddingTop: '6%',
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        color: '#DBDBDB'
                      }}>
                      @
                    </span>
                    <input
                      type='text'
                      list='emails'
                      placeholder='Microsoft.com'
                      className='email_address_site'
                      style={{
                        borderRadius: '5px',
                        borderColor: 'rgba(0, 0, 0, 0.26)',
                        height: '32px',
                        paddingLeft: '4%',
                        marginTop: '5%',
                        marginBottom: '5%',
                        width: '100%',
                        margin: '0, auto',
                        outline: 'none'
                      }}></input>
                    <datalist id='emails'>
                      <option value='google.com'>Google.com</option>
                      <option value='amazon.com'>Amazon.com</option>
                      <option value='apple.com'>Apple.com</option>
                      <option value='facebook.com'>Facebook.com</option>
                      <option value='netflix.com'>Netflix.com</option>
                    </datalist>
                  </div>
                  <br></br>
                  <input
                    placeholder='Password'
                    className='signup_password'
                    type='password'
                    style={{
                      borderRadius: '5px',
                      borderColor: 'rgba(0, 0, 0, 0.26)',
                      height: '100%',
                      paddingLeft: '4%',
                      width: '100%',
                      margin: '0, auto',
                      outline: 'none'
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
                    <span
                      className='radio__label'
                      style={{
                        fontSize: '15px',
                        color: '#8F8F8F',
                        width: '100%',
                        fontFamily: 'system-ui'
                      }}>
                      I have accepted the{' '}
                      <a
                        className='terms'
                        style={{ color: '#F699CD' }}
                        href='/terms'>
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{
                      backgroundColor: '#F699CD',
                      minWidth: '100px',
                      maxWidth: '100%',
                      width: '100%'
                    }}
                    type='submit'
                    onClick={onSignUp}>
                    Sign Up Now
                  </Button>
                  <div style={{ paddingTop: '3%' }}>
                    <span
                      style={{
                        color: '#8F8F8F',
                        paddingTop: '3%',
                        fontSize: '15px',
                        width: '100%',
                        fontFamily: 'system-ui'
                      }}>
                      Already have an account?
                      <a
                        className='terms'
                        style={{ color: '#F699CD', cursor: 'pointer' }}
                        // onClick={() => {
                        //   openLogin();
                        // }}
                        href='/login'>
                        {' '}
                        Log In
                      </a>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'block', padding: '6%' }}>
                  <p
                    style={{
                      fontSize: '20px',
                      fontFamily: 'system-ui',
                      fontWeight: '500',
                      color: '#0000008a'
                    }}>
                    WELCOME!
                  </p>
                  <p
                    style={{
                      fontSize: '20px',
                      fontFamily: 'system-ui',
                      fontWeight: '500',
                      color: '#0000008a',
                      paddingTop: '3%'
                    }}>
                    Thanks for signing up! We just need you to verify your email
                    address to complete setting up your account, please check
                    your email and click the link to verify. We are 100% sure no
                    future spam email at all.
                  </p>
                </div>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{
                    backgroundColor: '#F699CD',
                    minWidth: '100px',
                    maxWidth: '100%',
                    width: '100%'
                  }}
                  href='/login'>
                  LOG IN
                </Button>
              </>
            )}
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
  )
}

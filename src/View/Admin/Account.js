import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import $ from 'jquery'
import { useHistory } from 'react-router-dom'

import { db, auth } from '../../firebase'
import Photos from './Photos.js'
import Pagination from '../../components/Pagination/index'

function Account({ user }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [yourGender, setYourGender] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  // const [email, setEmail] = useState('')
  // const [address1, setAddress1] = useState('')
  // const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [introduction, setIntroduction] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (firstName === '' && lastName === '') {
      db.collection('UserProfile')
        .doc(auth.currentUser.email)
        .get()
        .then((doc) => {
          if (doc.data()) {
            setFirstName(doc.data()['firstName'])
            setLastName(doc.data()['lastName'])
            setYourGender(doc.data()['yourGender'])
            setAge(doc.data()['years'])
            setPhone(doc.data()['phone'])
            setCity(doc.data()['city'])
            setState(doc.data()['state'])
            setCountry(doc.data()['country'])
            setZipCode(doc.data()['zipCode'])
            setIntroduction(doc.data()['introduction'])
            // setEmail(doc.data()['email'])
            // setAddress1(doc.data()['address1'])
            // setAddress2(doc.data()['address2'])
          }
        })
    }
  })
  const onDelete = () => {
    alert('Do you want to delete your account?')
    db.collection('UserProfile').doc(auth.currentUser.email).delete().then(
      history.push('/')
    )
  }

  const onSave = () => {
    const firstName = $('.first_name').val()
    const middle = $('.middle').val()
    const lastName = $('.last_name').val()
    const yourGender = $('.yourgender').val()
    const years = $('.year').val()
    const emailAddress = $('.email_address').val()
    const phone = $('.phone').val()
    const city = $('.city').val()
    const state = $('.state').val()
    const country = $('.country').val()
    const zipCode = $('.zipcode').val()
    const introduction = $('.introduction').val()
    // const address1 = $('.address1').val()
    // const address2 = $('.address2').val()

    if (
      firstName &&
      lastName &&
      yourGender &&
      years &&
      emailAddress &&
      phone &&
      city &&
      state &&
      country &&
      zipCode &&
      introduction
      // address1 &&
      // address2 &&
    ) {
      db.collection('UserProfile')
        .doc(user.email)
        .update({
          firstName,
          middle,
          lastName,
          yourGender,
          years,
          emailAddress,
          phone,
          city,
          state,
          country,
          zipCode,
          introduction
          // gender,
          // months,
          // days,
          // address1,
          // address2,
        })
        .then(() => {
          console.log('updated successfully!')
        })
        .catch((error) => {
          console.log('updating profile error!', error.message)
          db.collection('UserProfile')
            .doc(user.email)
            .set({
              firstName,
              middle,
              lastName,
              yourGender,
              years,
              emailAddress,
              phone,
              city,
              state,
              country,
              zipCode,
              introduction
              // months,
              // days,
              // address1,
              // gender,
              // address2,
            })
            .then(() => {
              console.log('created new profile successfully!')
            })
        })
      alert('Update successfully!')
    } else {
      alert('Please fill out all forms!')
    }
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          paddingLeft: '10%',
          display: 'block',
          paddingTop: '5%'
        }}>
        <div style={{ paddingBottom: '2%' }}>
          <span
            style={{
              fontSize: '26px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a'
              // paddingbottom:'2%'
            }}>
            Personal info{' '}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'block', width: '45%' }}>
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Full name{' '}
              </span>
            </div>
            <div style={{ display: 'flex', paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                className='first_name'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <span style={{ width: '5%' }}>{'   '}</span>
              <input
                placeholder='Middle'
                list='middle'
                className='middle'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <datalist id='middle'>
                <option value=' '>{''}</option>
              </datalist>
              <span style={{ width: '5%' }}>{'   '}</span>
              <input
                required
                autoFocus
                defaultValue={lastName}
                placeholder='Last Name'
                className='last_name'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            {/* your gender */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Your gender{' '}
              </span>
            </div>
            <div style={{ display: 'flex', paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={yourGender}
                placeholder='Choose'
                className='yourgender'
                list='yourgender'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <datalist id='yourgender'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </datalist>
              <span style={{ width: '3%' }}></span>
              {/* <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                  width: '37%'
                }}>
                looking for
              </span>
              <span style={{ width: '3%' }}></span>
              <input
                required
                autoFocus
                placeholder='Choose'
                className='gender'
                list='genders'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input> */}
              {/* <datalist id='genders'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </datalist> */}
            </div>
            {/* Date of Birth */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Age
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={age}
                placeholder='Age *'
                className='year'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '35.5%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            {/* Email Address */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Email Address
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={auth.currentUser.email}
                placeholder='Email from back end when user signing up'
                className='email_address'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '80%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            {/* Phone number */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Phone
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={phone}
                // onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone(Optional)'
                className='phone'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '80%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            {/* Address */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Location
              </span>
            </div>
            {/* <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={address1}
                placeholder='Address 1'
                className='address1'
                list='address1'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <datalist id='address1'>
                <option value=' '></option>
              </datalist>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={address2}
                placeholder='Address 2'
                className='address2'
                list='address2'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <datalist id='address2'>
                <option value=' '></option>
              </datalist>
            </div> */}
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={city}
                placeholder='City *'
                className='city'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '67%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <span style={{ width: '3%' }}> </span>
              <input
                required
                autoFocus
                defaultValue={state}
                placeholder='State *'
                className='state'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '32%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                defaultValue={country}
                placeholder='Country *'
                className='country'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '67%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
              <span style={{ width: '3%' }}> </span>
              <input
                required
                autoFocus
                defaultValue={zipCode}
                placeholder='Zip Code *'
                className='zipcode'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '32%',
                  margin: '0, auto',
                  outline: '#FF9100'
                }}></input>
            </div>
            <div style={{ paddingRight: '5%' }}>
              <Button
                variant='contained'
                color='secondary'
                style={{
                  backgroundColor: 'white',
                  minWidth: '100px',
                  maxWidth: '100%',
                  width: '30%',
                  color: '#0000008a',
                  // borderColor: '#8f8f8f',
                  fontWeight: '500',
                  border: '2px solid #00000033'
                }}
                type='submit'
                onClick={onDelete}>
                Delete Account
              </Button>
            </div>
          </div>
          <div
            style={{
              width: '45%',
              display: 'block',
              paddingBottom: '2%',
              paddingRight: '10%'
            }}>
            <span
              style={{
                fontSize: '24px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#0000008a'
              }}>
              Photos
            </span>
            <Photos user={user} />
            <div style={{ paddingTop: '5%' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a'
                }}>
                Introduction
              </span>
            </div>
            <div>
              <textarea
                required
                autoFocus
                defaultValue={introduction}
                className='introduction'></textarea>
            </div>
            <div
              style={{
                display: 'flex',
                paddingTop: '3%',
                float: 'right'
              }}>
              <div style={{ paddingRight: '5%' }}>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{
                    backgroundColor: '#F699CD',
                    minWidth: '100px',
                    maxWidth: '100%',
                    width: '30%'
                  }}
                  type='submit'
                  onClick={onSave}>
                  Save
                </Button>
              </div>
              <Button
                variant='contained'
                style={{
                  color: '#8F8F8F'
                }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Pagination location={`/wholikesyou`} />
    </div>
  )
}

export default Account

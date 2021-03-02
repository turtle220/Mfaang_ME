import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button } from '@material-ui/core';
import $ from 'jquery';
import firebase from 'firebase';

import { db, auth, storage } from '../../firebase';
import Photos from './Photos.js';
import Pagination from '../../components/Pagination/index';

function Account({ user }) {
  // const dispatch = useDispatch();
  // const [firstName, setFirstName] = useState('');
  // const [middle, setMiddle] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [yourGender, setYourGender] = useState('');
  // const [gender, setGender] = useState('');
  // const [months, setMonths] = useState('');
  // const [days, setDays] = useState('');
  // const [years, setYears] = useState('');
  // const [emailAddress, setEmailAddress] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address1, setAddress1] = useState('');
  // const [address2, setAddress2] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country, setCountry] = useState('');
  // const [zipCode, setZipCode] = useState('');
  // const [introduction, setIntroduction] = useState('');

  const onSave = () => {
    const firstName = $('.first_name').val();
    const middle = $('.middle').val();
    const lastName = $('.last_name').val();
    const yourGender = $('.yourgender').val();
    const gender = $('.gender').val();
    // const months = $('.month').val();
    // const days = $('.day').val();
    const years = $('.year').val();
    const emailAddress = $('.email_address').val();
    const phone = $('.phone').val();
    const address1 = $('.address1').val();
    const address2 = $('.address2').val();
    const city = $('.city').val();
    const state = $('.state').val();
    const country = $('.country').val();
    const zipCode = $('.zipcode').val();
    const introduction = $('.introduction').val();

    // console.log('-----accountUser:', firstName);
    if (
      firstName &&
      middle &&
      lastName &&
      yourGender &&
      // months &&
      // days &&
      years &&
      emailAddress &&
      phone &&
      address1 &&
      address2 &&
      city &&
      state &&
      country &&
      zipCode &&
      introduction
    ) {

      db.collection('UserProfile')
        .doc(user.email)
        .update({
          firstName,
          middle,
          lastName,
          yourGender,
          gender,
          // months,
          // days,
          years,
          emailAddress,
          phone,
          address1,
          address2,
          city,
          state,
          country,
          zipCode,
          introduction,
        })
        .then(() => {
          console.log('updated successfully!');
        })
        .catch((error) => {
          console.log('updating profile error!', error.message);
          db.collection('UserProfile')
            .doc(user.email)
            .set({
              firstName,
              middle,
              lastName,
              yourGender,
              gender,
              // months,
              // days,
              years,
              emailAddress,
              phone,
              address1,
              address2,
              city,
              state,
              country,
              zipCode,
              introduction,
            })
            .then(() => {
              console.log('created new profile successfully!');
            });
        });
      alert('Update successfully!');
    } else {
      alert("Please fill out all forms!")
    }
  };

  return (
    <div >
      <div
        style={{
          backgroundColor: 'white',
          paddingLeft: '10%',
          display: 'block',
          paddingTop: '5%',
        }}>
        <div>
          <span
            style={{
              fontSize: '30px',
              fontFamily: 'system-ui',
              fontWeight: '500',
              color: '#0000008a',
            }}>
            Personal info{' '}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'block', width: '45%' }}>
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Full name{' '}
              </span>
            </div>
            <div style={{ display: 'flex', paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={firstName}
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
                  outline: '#FF9100',
                }}></input>
              <span style={{ width: '5%' }}>{'   '}</span>
              <input
                required
                autoFocus
                placeholder='Middle'
                className='middle'
                // value={middle}
                // onChange={(e) => setMiddle(e.target.value)}
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <span style={{ width: '5%' }}>{'   '}</span>
              <input
                required
                autoFocus
                placeholder='Last Name'
                className='last_name'
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            {/* your gender */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Your gender{' '}
              </span>
            </div>
            <div style={{ display: 'flex', paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                placeholder='Choose'
                className='yourgender'
                list='yourgender'
                // value={yourGender}
                // onChange={(e) => {
                //   setYourGender(e.target.valule);
                // }}
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <datalist id='yourgender'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </datalist>
              <span style={{ width: '3%' }}></span>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                  width: '37%',
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
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <datalist id='genders'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </datalist>
            </div>
            {/* Date of Birth */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Date of birth
              </span>
            </div>
            <div style={{paddingBottom: '2%'}}>
              <input
                  required
                  autoFocus
                  placeholder='Age *'
                  className='year'
                  style={{
                    borderRadius: '5px',
                    borderColor: 'rgba(0, 0, 0, 0.26)',
                    height: '35px',
                    paddingLeft: '4%',
                    width: '35.5%',
                    margin: '0, auto',
                    outline: '#FF9100',
                  }}></input>
            </div>
            {/* <div style={{ display: 'flex', paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={months}
                // onChange={(e) => setMonths(e.target.value)}
                placeholder='Month'
                className='month'
                list='months'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <datalist id='months'>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </datalist>
              <span style={{ width: '3%' }}></span>
              <input
                required
                autoFocus
                placeholder='Day'
                className='day'
                // value={days}
                // onChange={(e) => setDays(e.target.value)}
                list='days'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <datalist id='days'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </datalist>
              <span style={{ width: '3%' }}></span>
              <input
                required
                autoFocus
                // value={years}
                // onChange={(e) => setYears(e.target.value)}
                placeholder='Year *'
                className='year'
                list='years'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '50%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <datalist id='years'>
                <option>2010</option>
                <option>2011</option>
                <option>2012</option>
                <option>2013</option>
                <option>2014</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </datalist>
            </div> */}
            {/* Email Address */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Email Address
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={emailAddress}
                // onChange={(e) => setEmailAddress(e.target.value)}
                placeholder='Email from back end when user signing up'
                className='email_address'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '80%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            {/* Phone number */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Phone
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                placeholder='phone'
                className='phone'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '80%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            {/* Address */}
            <div style={{ paddingBottom: '2%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Address
              </span>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={address1}
                // onChange={(e) => setAddress1(e.target.value)}
                placeholder='Address 1'
                className='address1'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={address2}
                // onChange={(e) => setAddress2(e.target.value)}
                placeholder='Address 2'
                className='address2'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '100%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={city}
                // onChange={(e) => setCity(e.target.value)}
                placeholder='City *'
                className='city'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '67%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <span style={{ width: '3%' }}> </span>
              <input
                required
                autoFocus
                // value={state}
                // onChange={(e) => setState(e.target.value)}
                placeholder='State *'
                className='state'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '32%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
            <div style={{ paddingBottom: '2%' }}>
              <input
                required
                autoFocus
                // value={country}
                // onChange={(e) => setCountry(e.target.value)}
                placeholder='Country *'
                className='country'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '67%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
              <span style={{ width: '3%' }}> </span>
              <input
                required
                autoFocus
                // value={zipCode}
                // onChange={(e) => setZipCode(e.target.value)}
                placeholder='Zip Code *'
                className='zipcode'
                style={{
                  borderRadius: '5px',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  height: '35px',
                  paddingLeft: '4%',
                  width: '32%',
                  margin: '0, auto',
                  outline: '#FF9100',
                }}></input>
            </div>
          </div>
          <div
            style={{
              width: '45%',
              display: 'block',
              paddingBottom: '2%',
              paddingRight: '10%',
            }}>
            <span
              style={{
                fontSize: '26px',
                fontFamily: 'system-ui',
                fontWeight: '500',
                color: '#0000008a',
              }}>
              Photos
            </span>
            <Photos user={user}/>
            <div style={{ paddingTop: '5%' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontFamily: 'system-ui',
                  fontWeight: '500',
                  color: '#0000008a',
                }}>
                Introduction
              </span>
            </div>
            <div>
              <textarea
                required
                autoFocus
                // value={introduction}
                // onChange={(e) => setIntroduction(e.target.value)}
                className='introduction'></textarea>
            </div>
            <div
              style={{
                display: 'flex',
                paddingTop: '3%',
                float: 'right',
                width: '42%',
              }}>
              <Button
                variant='contained'
                color='secondary'
                style={{
                  backgroundColor: '#F699CD',
                  minWidth: '100px',
                  maxWidth: '100%',
                  width: '30%',
                }}
                type='submit'
                onClick={onSave}
                >
                Save
              </Button>
              <span style={{ width: '3%' }}>{''}</span>
              <Button
                variant='contained'
                // color='secondary'
                style={{
                  // backgroundColor: '#F699CD',
                  minWidth: '100px',
                  maxWidth: '100%',
                  width: '30%',
                  color: '#8F8F8F',
                }}
                // onClick={()=>onSave}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Pagination location={`/wholikesyou`}/>
    </div>
  );
}

export default Account;

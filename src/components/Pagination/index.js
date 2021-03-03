import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import BackButton from '../../images/button-boldback.svg';

export default function Pagination({location}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '10%',
        width: '91%',
        paddingTop: '5%',
      }}>
      <a
        href='/'
        style={{
          display: 'flex',
          width: '50%',
          textDecoration: 'none',
          paddingTop: '0.7%',
        }}>
        <img
          src={BackButton}
          style={{ color: '#8F8F8F', height: '22px' }}
          alt=''
        />
        <p
          style={{
            paddingLeft: '2%',
            fontWeight: 'bold',
            fontFamily: 'system-ui',
            color: '#8F8F8F',
          }}>
          BACK
        </p>
      </a>
      <Button
        variant='contained'
        color='secondary'
        size='medium'
        href={location}
        style={{
          backgroundColor: '#F699CD',
          minWidth: '200px',
          maxWidth: '200px',
        }}>
        Next
      </Button>
    </div>
  );
}

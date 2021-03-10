import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const FooterEx = () => (
  <div style={{backgroundColor: '#F8F8F8',position: 'relative'}}>
    <div
      style={{
        margin: 'auto',
        textAlign: 'left',
        backgroundColor: '#F8F8F8',
        paddingLeft: '10%',
        paddingTop: '0.5%',
        marginTop: '3%',
        position: 'relative'
      }}>
      <Grid container style={{ justify: 'left', spacing: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align={'left'}
            gutterBottom
            color={'textSecondary'}
            style={{
              color: '#0000008a',
              fontSize: '16px',
              fontFamily: 'system-ui',
              fontWeight: 'bold'
            }}>
            About
          </Typography>
          <div style={{ display: 'block' }}>
            <a
              href='/about'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              About US
            </a>
          </div>
          <div>
            <a
              href='/contact'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              How Mfaang Works
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align={'left'}
            gutterBottom
            color={'textSecondary'}
            style={{
              color: '#0000008a',
              fontSize: '16px',
              fontFamily: 'system-ui',
              fontWeight: 'bold'
            }}>
            Support
          </Typography>
          <div>
            <a
              href='/help'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Help Center
            </a>
          </div>
          <div>
            <a
              href='/trust'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Trust & Safety
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align={'left'}
            gutterBottom
            color={'textSecondary'}
            style={{
              color: '#0000008a',
              fontSize: '16px',
              fontFamily: 'system-ui',
              fontWeight: 'bold'
            }}>
            Legal
          </Typography>
          <div>
            <a
              href='/terms'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Terms
            </a>
          </div>
          <div>
            <a
              href='/terms'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Privacy
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align={'left'}
            gutterBottom
            color={'textSecondary'}
            style={{
              color: '#0000008a',
              fontSize: '16px',
              fontFamily: 'system-ui',
              fontWeight: 'bold'
            }}>
            Price
          </Typography>
          <div>
            <a
              href='/membership'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Membership
            </a>
          </div>
          <div>
            <a
              href='/cancellation'
              style={{
                textDecoration: 'none',
                color: '#8F8F8F',
                fontSize: '16px',
                fontFamily: 'system-ui',
                fontWeight: 'lighter'
              }}>
              Cancellation
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
    <div
      style={{
        width: '87%',
        color: '#8f8f8f',
        paddingTop: '2%',
        textAlign: 'center',
        paddingLeft: '7%'
      }}>
      <hr
        style={{
          borderRight: 'none',
          borderLeft: 'none',
          borderBottom: 'none',
          borderTopColor: '#8f8f8f2b'
        }}></hr>
    </div>
    <div style={{paddingTop:'1%', paddingBottom: '1%'}}>
      <Typography
        variant='caption'
        align={'center'}
        style={{
          color: '#8F8F8F',
          fontSize: '16px',
          fontFamily: 'system-ui',
          fontWeight: '100',
          paddingLeft: '40%'
        }}>
        @ 2021 Mfaang.com All rights reserved
      </Typography>
    </div>
  </div>
)

FooterEx.propTypes = {}
FooterEx.defaultProps = {}

export default FooterEx

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const FooterEx = () => (
  <div style={{ maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
    <Grid container justify={'center'} spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'center'} gutterBottom color={'textSecondary'} style={{fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter'}}>
          About
        </Typography>
        <div style={{ display: 'block' }}>
          <a href='/about' style={{ textDecoration: 'none', color: '#8F8F8F',fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            About US
          </a>
        </div>
        <div>
          <a
            href='/contact'
            style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            How Mfaang Works
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'center'} gutterBottom color={'textSecondary'} style={{fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter'}}>
          Support
        </Typography>
        <div>
          <a href='/help' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Help Center
          </a>
        </div>
        <div>
          <a href='/trust' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Trust & Safety
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'center'} gutterBottom color={'textSecondary'} style={{fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter'}}>
          Legal
        </Typography>
        <div>
          <a href='/terms' style={{ textDecoration: 'none', color: '#8F8F8F',fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Terms
          </a>
        </div>
        <bid>
          <a href='/terms' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Privacy
          </a>
        </bid>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'center'} gutterBottom color={'textSecondary'} style={{fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter'}}>
          Price
        </Typography>
        <div>
          <a href='/' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Membership
          </a>
        </div>
        <div>
          <a
            href='/cancellation'
            style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Cancellation
          </a>
        </div>
      </Grid>
    </Grid>
    <Divider style={{ margin: '24px auto', width: 60 }} />
    <Typography variant='caption' align={'center'} style={{fontSize:'23px', fontFamily:'system-ui', fontWeight:'lighter'}}>
      @ 2021 Mfaang.com All rights reserved
    </Typography>
  </div>
);

FooterEx.propTypes = {};
FooterEx.defaultProps = {};

export default FooterEx;

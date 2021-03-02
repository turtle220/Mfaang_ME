import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const FooterEx = () => (
  <div style={{ margin: 'auto', textAlign: 'left', backgroundColor:'#F8F8F8', paddingLeft:'10%', paddingTop:'4%', marginTop:'5%' }}>
    <Grid container style={{justify:'left', spacing:5}} >
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'left'} gutterBottom color={'textSecondary'} style={{color:'#0000008a', fontSize:'19px', fontFamily:'system-ui', fontWeight:'bold'}}>
          About
        </Typography>
        <div style={{ display: 'block' }}>
          <a href='/about' style={{ textDecoration: 'none', color: '#8F8F8F',fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            About US
          </a>
        </div>
        <div>
          <a
            href='/contact'
            style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            How Mfaang Works
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'left'} gutterBottom color={'textSecondary'} style={{color:'#0000008a', fontSize:'19px', fontFamily:'system-ui', fontWeight:'bold'}}>
          Support
        </Typography>
        <div>
          <a href='/help' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Help Center
          </a>
        </div>
        <div>
          <a href='/trust' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Trust & Safety
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'left'} gutterBottom color={'textSecondary'} style={{color:'#0000008a', fontSize:'19px', fontFamily:'system-ui', fontWeight:'bold'}}>
          Legal
        </Typography>
        <div>
          <a href='/terms' style={{ textDecoration: 'none', color: '#8F8F8F',fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Terms
          </a>
        </div>
        <div>
          <a href='/terms' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Privacy
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align={'left'} gutterBottom color={'textSecondary'} style={{color:'#0000008a', fontSize:'19px', fontFamily:'system-ui', fontWeight:'bold'}}>
          Price
        </Typography>
        <div>
          <a href='/membership' style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Membership
          </a>
        </div>
        <div>
          <a
            href='/cancellation'
            style={{ textDecoration: 'none', color: '#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'lighter' }}>
            Cancellation
          </a>
        </div>
      </Grid>
    </Grid>
    <Divider style={{ margin: '24px auto', width: 100 }} />
    <Typography variant='caption' align={'center'} style={{color:'#8F8F8F', fontSize:'19px', fontFamily:'system-ui', fontWeight:'100',  paddingLeft:'35%'}}>
      @ 2021 Mfaang.com All rights reserved
    </Typography>
  </div>
);

FooterEx.propTypes = {};
FooterEx.defaultProps = {};

export default FooterEx;

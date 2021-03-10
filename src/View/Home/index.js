import React from 'react';

import './index.css';
import ImageGallery from '../../components/Gallery/index';
import MembersFrom from '../../images/Home/MembersFrom.svg';
import MainCode from '../../images/Home/Main-Code.svg';
import UseMffang from '../../images/Home/UseMfaang.svg';

function Home() {

  return (
    <div>
      <div style={{ backgroundColor: 'white', paddingLeft: '10%', display:'block', paddingTop: '5%' }}>
        <div><span style={{fontSize:'26px', fontFamily:'system-ui', fontWeight:'700', color:'#0000008a'}}>Members from</span></div>
        <img src={MembersFrom} alt="" style={{paddingTop:'2%', width:'90%'}}/>
      </div>

      <div style={{ backgroundColor: 'white', paddingLeft: '10%', display:'block', paddingTop: '3%', paddingBottom:'3%' }}>
        <div>
          <span style={{fontSize:'26px', fontFamily:'system-ui', fontWeight:'700', color:'#0000008a'}}>Say Hello to your tech fellows </span>
          <span style={{fontFamily:'system-ui', fontWeight:'700', color:'#0000008a'}}>  {'{'} requires company email to sign up {'}'}</span>
        </div>
        <ImageGallery style={{maxWidth:'95%'}} />
      </div>

      <img src={MainCode} style={{width:'100%', height:'520px', backgroundColor:'black'}} alt="" />
      
      <div>
        <button  style={{position:'absolute', zIndex: 9999, width: 100, height:40, left:'89%', marginTop:'-8%'}}><a href="/login" style={{textDecoration:'none'}}> Deploy </a> </button>
      </div>
      <div style={{ backgroundColor: 'white', paddingLeft: '10%', display:'block', height:365, paddingTop:'3%' }}>
        <div>
          <span style={{fontSize:'26px', fontFamily:'system-ui', fontWeight:'700', color:'#0000008a'}}>Why use Mfaang</span>
        </div>
        <img src={UseMffang} alt="" style={{width:'90%', paddingTop:'2%'}} />
      </div>

    </div>
  );
}

export default Home;

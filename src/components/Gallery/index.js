import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

import imageTest1 from '../../images/test(1).jpg';
import NextButtonIcon from '../../images/Home/NextButton.svg';
import BackButtonIcon from '../../images/Home/BackButton.svg';

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 20;
  return (
    <div style={{ padding: `0 ${chevronWidth}px`, paddingTop:'3%', maxWidth:'90%' }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={10}
        leftChevron={<img src={BackButtonIcon} alt="" />}
        rightChevron={<img src={NextButtonIcon} alt="" />}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        <div style={{ height: 270, width: '100%', background: '#EEE' }}><img src={imageTest1} style={{width:'100%', height:270}} alt="" /></div>
        {/* <div style={{ height: 200, background: '#EEE' }}></div>
        <div style={{ height: 200, background: '#EEE' }}></div>
        <div style={{ height: 200, background: '#EEE' }}> </div>
        <div style={{ height: 200, background: '#EEE' }}> </div>
        <div style={{ height: 200, background: '#EEE' }}> </div> */}
      </ItemsCarousel>
    </div>
  );
};
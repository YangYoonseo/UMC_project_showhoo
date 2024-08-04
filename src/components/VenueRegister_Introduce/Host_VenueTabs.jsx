import React from 'react';

const VenueTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="venue-tabs">
      <button className={selectedTab === 'introduction' ? 'active' : ''} onClick={() => setSelectedTab('introduction')}>공연장 소개</button>
      <button className={selectedTab === 'facility' ? 'active' : ''} onClick={() => setSelectedTab('facility')}>시설 안내</button>
      <button className={selectedTab === 'notice' ? 'active' : ''} onClick={() => setSelectedTab('notice')}>유의사항</button>
      <button className={selectedTab === 'schedule' ? 'active' : ''} onClick={() => setSelectedTab('schedule')}>대관일정</button>
      <button className={selectedTab === 'reviews' ? 'active' : ''} onClick={() => setSelectedTab('reviews')}>후기</button>
    </div>
  );
};

export default VenueTabs;

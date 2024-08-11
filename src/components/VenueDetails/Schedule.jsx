//schedule.jsx
// mock data 가져오지 않고, 세부 페이지에서 직접 api 연결함

import React from 'react';
import './VenueDetails.css';
import CalenderComponent from "./CalenderComponent";

const Schedule = () => {
  return (
    <div className="venue-schedule">
      <div className="schedule-title">대관 일정</div>
      <div className="calendar2">
        <CalenderComponent/>
      </div>
    </div>
  );
};

export default Schedule;



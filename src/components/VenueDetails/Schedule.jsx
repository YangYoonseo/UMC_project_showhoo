//schedule.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VenueDetails.css';

const Schedule = () => {
  return (
    <div className="venue-schedule">
      <div className="schedule-title">대관 일정</div>
      <Calendar
        className="calendar"
        formatDay={(locale, date) => date.getDate()}
      />
    </div>
  );
};

export default Schedule;



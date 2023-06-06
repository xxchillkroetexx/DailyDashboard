import React from 'react';
import CalDAVCalendar from './getKalender';

const KalenderPanel = () => {
  const calDAVUrl = 'https://calendar.google.com/calendar/embed?src=g.julian%40gmx.net&ctz=Europe%2FBerlin';

  return (
    <div>
      <h1>Next-Up</h1>
      <p>Deine nächsten Termine:</p>
      <CalDAVCalendar />
    </div>
  );
};

export default KalenderPanel;

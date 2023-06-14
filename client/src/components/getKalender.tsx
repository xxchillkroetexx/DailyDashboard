import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import ical from 'ical.js';

const getKalender = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://calendar.google.com/calendar/embed?src=g.julian%40gmx.net&ctz=Europe%2FBerlin', {
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      const data = response.data;

      const parsedEvents = parseCalDAVData(data);
      setEvents(parsedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const parseCalDAVData = (data: string): Event[] => {
    const jcalData = ical.parse(data);
    const comp = new ical.Component(jcalData);

    const events: Event[] = [];

    comp.getAllProperties('vevent').forEach((property) => {
      const event: Event = {};

      property.getAllProperties().forEach((prop) => {
        switch (prop.name.toLowerCase()) {
          case 'summary':
            event.summary = prop.getFirstValue();
            break;
          case 'description':
            event.description = prop.getFirstValue();
            break;
          case 'dtstart':
            event.start = prop.getFirstValue().toString();
            break;
          case 'dtend':
            event.end = prop.getFirstValue().toString();
            break;
          // Weitere Eigenschaften können hier verarbeitet werden
          default:
            break;
        }
      });

      events.push(event);
    });

    return events;
  };

  return (
    <div>
      <h2>CalDAV Calendar</h2>
      {events.map((event, index) => (
        <div key={index}>
          <h3>{event.summary}</h3>
          <p>{event.description}</p>
          <p>Start: {event.start}</p>
          <p>End: {event.end}</p>
        </div>
      ))}
    </div>
  );
};

export default getKalender;

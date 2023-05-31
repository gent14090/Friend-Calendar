import React from "react";
import { useEffect, useState } from "react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <img src={event.image} alt={event.title} />
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <p>Categories: {event.categories.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;

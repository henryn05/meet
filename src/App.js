import "./App.css";
import { useState, useEffect } from "react";
import { getEvents } from "./api.js";

import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App" data-testid="App">
      <CitySearch />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
}

export default App;

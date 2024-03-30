import "./App.css";

import CitySearch from "./components/CitySearch";
import Event from "./components/Event";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";

function App() {
  return (
    <div className="App">
      <CitySearch />
      <Event />
      <EventList />
      <NumberOfEvents />
    </div>
  );
}

export default App;

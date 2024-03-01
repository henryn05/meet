import { useState } from "react";

const NumberOfEvents = ({ events }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setNumberOfEvents(newValue);
  }

  return (
    <div id="number-of-events">
      <input
        type="text"
        id="numberOfEventsInput"
        data-testid="numberOfEventsInput"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents
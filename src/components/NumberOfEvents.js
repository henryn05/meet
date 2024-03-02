import { useState } from "react";

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    if (!(event.target.value < 0)) {
      const newValue = event.target.value;
      setNumberOfEvents(newValue);
      return;
    }

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
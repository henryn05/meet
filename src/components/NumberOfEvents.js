const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChange = (event) => {
    if (!(event.target.value < 0)) {
      const newValue = event.target.value;
      setCurrentNOE(newValue);
      return;
    }
  };

  return (
    <div id="number-of-events" data-testid="number-of-events">
      <input
        type="text"
        id="numberOfEventsInput"
        data-testid="numberOfEventsInput"
        value={currentNOE}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;

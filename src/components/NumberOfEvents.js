const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChange = (event) => {
    if (!(event.target.value < 0)) {
      const newValue = event.target.value;
      setCurrentNOE(newValue);
      return;
    }
  };

  return (
    <div id="numberOfEvents" data-testid="numberOfEvents">
      <input
        type="text"
        id="numberOfEventsInput"
        data-testid="numberOfEventsInput"
        placeholder="Number of Suggestions"
        value={currentNOE}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;

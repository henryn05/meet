const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const handleInputChange = (event) => {
    let infoText = "";
    const value = event.target.value;

    if (isNaN(value)) {
      infoText = "The value you inputted is not a number";
    } else if (value < 0) {
      infoText = "The value you inputted is a negative number";
    }

    setCurrentNOE(value);
    setErrorAlert(infoText);
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

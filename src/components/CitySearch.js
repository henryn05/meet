import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    // obtain current value of input field
    const value = event.target.value;
    // filter allLocations array
    const filteredLocations = allLocations ? allLocations.fitler((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    // Set query local state to input value
    // Set suggestions local state to filtered locations array
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  return (
    <div id="city-search">
      <input
        class="city"
        type="text"
        placeholder="City"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li key={suggestion}>{suggestion}</li>;
          })}
          ;
          <li key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;

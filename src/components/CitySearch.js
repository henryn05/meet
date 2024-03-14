import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    // obtain current value of input field
    const value = event.target.value;
    // filter allLocations array
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    // Set query local state to input value
    // Set suggestions local state to filtered locations array
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    // obtain value of city
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(true);
  }

  return (
    <div id="city-search" data-testid="city-search">
      {/*
        Searchbar to find cities
      */}
      <input
        class="city"
        type="text"
        placeholder="City"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {/*
        * If showSuggestions is true, create unordered list of suggestions
        * If not, return null (same thing as hiding the list)
      */}
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li
              key={suggestion}
              onClick={handleItemClicked}
            >
              {suggestion}
            </li>;
          })}
          ;
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
  );
};

export default CitySearch;

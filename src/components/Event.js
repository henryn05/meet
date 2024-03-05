import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li id="event">
      <h1>{event && event.summary}</h1>
      <p>{event && event.location}</p>
      <p>{event && event.created}</p>
      {/*
        Button starts by showing "Show Details" by default
        but then when user clicks, it shows "Hide Details"
      */}
      {/*
        Div remains hidden until "Show Details" button is
        clicked and can be hidden afterwards when "Hide
        Details" is clicked
      */}
      {showDetails && <div className="details"></div>}
      <button
        onClick={() => {showDetails ? setShowDetails(false) : setShowDetails(true)}}
      >
        {/*
          * Ternary operator checks if showDetails is true or
            false
          * If true, display "Hide Details", if false,
            display "Show Details"
        */}
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
import { useState } from "react";
import moment from "moment";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      {/*
       *Checks if "event" object exists before displaying info
       */}
      <h1>{event && event.summary}</h1>
      <p>{event && event.location}</p>
      {/*
       *Uses moment.js to format "created" date
       */}
      <p>{event && moment(event.created).format("MMMM Do YYYY, h:mm:ss a")}</p>

      <button onClick={toggleDetails}>
        {/*
         * Display text based on the 'showDetails' state.
         * If 'showDetails' is true, display "Hide Details"; otherwise, display "Show Details".
         */}
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {/*
      * Conditional rendering: Display additional details only if 'showDetails' state is true.
      */}
      {showDetails && (
        <div>
          <p>Event Details</p>
        </div>
      )}
    </li>
  );
};

export default Event;
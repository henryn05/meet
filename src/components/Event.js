import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event" id={`event-${event.id}`} data-testid={`event-${event.id}`}>
      <h1>{event && event.summary}</h1>
      <p>{event && event.location}</p>
      <p>{event && event.created}</p>
      {showDetails && (
        <div className="details" data-testid="event-info-dialogue"></div>
      )}
      <button
        className="details-btn"
        onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;

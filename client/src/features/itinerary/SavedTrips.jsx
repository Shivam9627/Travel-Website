import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SavedTrips.css"; // Assuming you will create a CSS file for styling

const SavedTrips = () => {
  const savedTrips = useSelector((state) => state.booking.savedTrips);

  return (
    <div className="saved-trips">
      <h2>Your Saved Trips</h2>
      {savedTrips.length === 0 ? (
        <p>You have no saved trips. Start planning your next adventure!</p>
      ) : (
        <ul>
          {savedTrips.map((trip) => (
            <li key={trip.id}>
              <Link to={`/trip/${trip.id}`}>
                <h3>{trip.destination}</h3>
                <p>{trip.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedTrips;
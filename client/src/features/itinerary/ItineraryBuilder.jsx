import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItinerary } from "../../store/slices/bookingSlice";
import "./ItineraryBuilder.css";

const ItineraryBuilder = () => {
  const [tripName, setTripName] = useState("");
  const [destinations, setDestinations] = useState([]);
  const dispatch = useDispatch();
  const savedItineraries = useSelector((state) => state.booking.itineraries);

  const handleAddDestination = (destination) => {
    setDestinations((prevDestinations) => [...prevDestinations, destination]);
  };

  const handleRemoveDestination = (destination) => {
    setDestinations((prevDestinations) =>
      prevDestinations.filter((dest) => dest !== destination)
    );
  };

  const handleSaveItinerary = () => {
    if (tripName && destinations.length > 0) {
      dispatch(addItinerary({ tripName, destinations }));
      setTripName("");
      setDestinations([]);
    } else {
      alert("Please provide a trip name and at least one destination.");
    }
  };

  return (
    <div className="itinerary-builder">
      <h2>Create Your Itinerary</h2>
      <input
        type="text"
        placeholder="Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />
      <div className="destination-input">
        <input
          type="text"
          placeholder="Add Destination"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              handleAddDestination(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <ul className="destination-list">
        {destinations.map((destination, index) => (
          <li key={index}>
            {destination}
            <button onClick={() => handleRemoveDestination(destination)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSaveItinerary}>Save Itinerary</button>
      <h3>Saved Itineraries</h3>
      <ul>
        {savedItineraries.map((itinerary, index) => (
          <li key={index}>
            <strong>{itinerary.tripName}</strong>: {itinerary.destinations.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryBuilder;
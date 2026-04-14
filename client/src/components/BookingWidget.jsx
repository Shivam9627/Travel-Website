import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../store/slices/bookingSlice";
import "./BookingWidget.css"; // Assuming you will create a CSS file for styling

const BookingWidget = ({ destination }) => {
  const [dates, setDates] = useState({ start: "", end: "" });
  const [guests, setGuests] = useState(1);
  const dispatch = useDispatch();

  const handleBooking = () => {
    const bookingData = {
      destinationId: destination.id,
      startDate: dates.start,
      endDate: dates.end,
      guests,
    };
    dispatch(createBooking(bookingData));
  };

  return (
    <div className="booking-widget">
      <h2>Book Your Trip</h2>
      <div className="booking-dates">
        <label>
          Start Date:
          <input
            type="date"
            value={dates.start}
            onChange={(e) => setDates({ ...dates, start: e.target.value })}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={dates.end}
            onChange={(e) => setDates({ ...dates, end: e.target.value })}
          />
        </label>
      </div>
      <div className="booking-guests">
        <label>
          Guests:
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingWidget;
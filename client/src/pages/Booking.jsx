import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchDestinations } from '../api/destinations';
import { createBooking, clearBookingError } from '../store/slices/bookingSlice';
import { useSavedTrips } from '../hooks/useSavedTrips';
import { formatCurrency } from '../utils/currency';
import './Booking.css';

const Booking = () => {
  const dispatch = useDispatch();
  const { loading, error, lastCreated } = useSelector((s) => s.bookings);
  const [searchParams] = useSearchParams();
  const paramDest = searchParams.get('destination');
  const paramRide = searchParams.get('ride');

  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState(paramDest || '');
  const [bookingDate, setBookingDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [rideName, setRideName] = useState(paramRide || '');
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

  const { trips, addTrip } = useSavedTrips();

  useEffect(() => {
    if (lastCreated) {
      // Add to local itineraries as well
      const dest = destinations.find(d => (d._id || d.id) === destinationId);
      addTrip({
        title: rideName ? `Ride: ${rideName}` : `Stay at ${dest?.name || 'Destination'}`,
        destinationName: dest?.name || rideName || 'Trip',
        destinationId: destinationId,
        start: bookingDate,
        notes: `Booked via website. Reference: ${lastCreated._id}`,
        isBooking: true,
        bookingId: lastCreated._id
      });
    }
  }, [lastCreated]);

  useEffect(() => {
    fetchDestinations().then((d) => {
      setDestinations(d);
      if (!destinationId && d[0] && !paramRide) setDestinationId(d[0]._id || d[0].id);
      else if (paramDest) setDestinationId(paramDest);
    });
  }, [paramDest, paramRide]);

  useEffect(() => {
    dispatch(clearBookingError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!bookingDate) {
      alert("Please select a date for your booking.");
      return;
    }
    dispatch(
      createBooking({
        destinationId: destinationId || 'ride-only',
        bookingDate: bookingDate,
        guests,
        rideName: rideName || undefined,
        paymentMethod,
      })
    );
  };

  const picked = destinations.find((d) => (d._id || d.id) === destinationId);

  return (
    <div className="page booking-page">
      <h1>{rideName ? `Book your ${rideName}` : 'Book your stay'}</h1>
      <p className="booking-page__lead">
        Confirm dates, party size, and payment method. Bookings are processed securely and confirmed instantly.
      </p>

      {lastCreated ? (
        <div className="booking-success">
          <p>
            <strong>✓ Booking confirmed!</strong> Reference <code>{lastCreated._id}</code>
          </p>
          {picked ? (
            <p>
              {picked.name} · {formatCurrency(lastCreated.totalPrice)} total (est.)
              <br />
              <span style={{ fontSize: '0.9em', color: '#666' }}>
                Payment: {lastCreated.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Prepaid'}
              </span>
            </p>
          ) : rideName ? (
            <p>
              {rideName} · Booking confirmed for {guests} guests.
              <br />
              <span style={{ fontSize: '0.9em', color: '#666' }}>
                Payment: {lastCreated.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Prepaid'}
              </span>
            </p>
          ) : null}
          <Link to="/itinerary" className="btn btn-ghost">
            View My Trips
          </Link>
        </div>
      ) : null}

      <form className="booking-form" onSubmit={handleSubmit}>
        {!rideName && (
          <label>
            Destination
            <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)} required>
              <option value="">Select a destination</option>
              {destinations.map((d) => (
                <option key={d._id || d.id} value={d._id || d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
        )}
        
        {rideName && (
          <label>
            Ride Selected
            <input type="text" value={rideName} disabled />
          </label>
        )}

        <label>
          Booking Date
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
        </label>
        
        <label>
          Number of Guests
          <input
            type="number"
            min={1}
            max={12}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          />
        </label>

        <fieldset>
          <legend>Payment Method</legend>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === 'cash_on_delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💵 Cash on Delivery</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>📱 UPI Payment</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Card Payment</span>
            </label>
          </div>
        </fieldset>

        {error ? <p className="booking-err">{error}</p> : null}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing…' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default Booking;

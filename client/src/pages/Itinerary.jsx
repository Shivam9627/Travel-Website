import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDestinations } from '../api/destinations';
import { useSavedTrips } from '../hooks/useSavedTrips';
import './Itinerary.css';

const Itinerary = () => {
  const { trips, addTrip, removeTrip } = useSavedTrips();
  const [destinations, setDestinations] = useState([]);
  const [title, setTitle] = useState('Summer escape');
  const [pick, setPick] = useState('');
  const [start, setStart] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchDestinations().then((d) => {
      setDestinations(d);
      if (d[0]) setPick(d[0]._id || d[0].id);
    });
  }, []); 

  const save = (e) => {
    e.preventDefault();
    const dest = destinations.find((x) => (x._id || x.id) === pick);
    if (!dest) return;
    addTrip({
      title,
      destinationName: dest.name,
      destinationId: pick,
      start,
      notes,
    });
    setNotes('');
  };

  return (
    <div className="page itinerary-page">
      <header className="itinerary-page__head">
        <h1>My trips & itineraries</h1>
        <p>
          Saved locally in your browser — pair with bookings and the AI planner for a full picture of what is next on
          your calendar.
        </p>
      </header>

      <div className="itinerary-layout">
        <motion.form className="itinerary-form" onSubmit={save} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Add upcoming trip</h2>
          <label>
            Trip name
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Destination
            <select value={pick} onChange={(e) => setPick(e.target.value)}>
              {destinations.map((d) => (
                <option key={d._id || d.id} value={d._id || d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Start date
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </label>
          <label>
            Notes
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Flights, hotel confirmations…" />
          </label>
          <button type="submit" className="btn btn-primary">
            Save trip
          </button>
        </motion.form>

        <section className="itinerary-timeline">
          <h2>Upcoming & saved</h2>
          {trips.length === 0 ? (
            <p className="itinerary-empty">No saved trips yet — add one on the left.</p>
          ) : (
            <ul className="itinerary-list">
              {trips.map((t) => (
                <li key={t.id} className="itinerary-item">
                  <div>
                    <h3>{t.title}</h3>
                    <p className="itinerary-item__dest">{t.destinationName}</p>
                    {t.start ? (
                      <time dateTime={t.start}>
                        Starts {new Date(t.start).toLocaleDateString()}
                      </time>
                    ) : null}
                    {t.notes ? <p className="itinerary-item__notes">{t.notes}</p> : null}
                  </div>
                  <button type="button" className="btn btn-ghost itinerary-item__rm" onClick={() => removeTrip(t.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Itinerary;

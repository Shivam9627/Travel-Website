import { useState, useEffect, useCallback } from 'react';

const KEY = 'skytrail_saved_trips';

export function useSavedTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setTrips(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const addTrip = useCallback((trip) => {
    const id = crypto.randomUUID();
    setTrips((prev) => {
      const next = [{ ...trip, id, createdAt: new Date().toISOString() }, ...prev];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeTrip = useCallback((id) => {
    setTrips((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateTrip = useCallback((id, patch) => {
    setTrips((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { trips, addTrip, removeTrip, updateTrip };
}

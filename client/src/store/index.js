import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './slices/destinationsSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    bookings: bookingReducer,
  },
});

export default store;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../services/api';

export const createBooking = createAsyncThunk(
  'booking/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/api/bookings', {
        destinationId: payload.destinationId,
        bookingDate: payload.bookingDate || payload.date || payload.startDate || new Date().toISOString(),
        numberOfGuests: Number(payload.guests ?? payload.numberOfGuests ?? 1),
        paymentMethod: payload.paymentMethod || 'cash_on_delivery',
        rideName: payload.rideName || null,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const fetchBookings = createAsyncThunk('booking/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await instance.get('/api/bookings');
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    lastCreated: null,
  },
  reducers: {
    clearBookingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.lastCreated = action.payload;
        state.bookings = [action.payload, ...state.bookings];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;

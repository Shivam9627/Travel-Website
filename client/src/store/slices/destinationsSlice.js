import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDestinations } from '../../api/destinations';

export const loadDestinations = createAsyncThunk('destinations/loadDestinations', async () => {
  return fetchDestinations();
});

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: {
    destinations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDestinations: (state) => {
      state.destinations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(loadDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearDestinations } = destinationsSlice.actions;

export default destinationsSlice.reducer;

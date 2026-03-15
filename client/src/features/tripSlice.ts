import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TripState, Location, DistanceInfo, TripStatus } from '../types/trip';

const initialState: TripState = {
  pickupLocation: null,
  dropLocation: null,
  driverLocation: null,
  status: 'idle',
  routePolylines: [],
  distanceInfo: null,
  isSocketConnected: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setPickupLocation(state, action: PayloadAction<Location | null>) {
      state.pickupLocation = action.payload;
    },
    setDropLocation(state, action: PayloadAction<Location | null>) {
      state.dropLocation = action.payload;
    },
    setDriverLocation(state, action: PayloadAction<Location | null>) {
      state.driverLocation = action.payload;
    },
    setTripStatus(state, action: PayloadAction<TripStatus>) {
      state.status = action.payload;
    },
    setRoutePolylines(state, action: PayloadAction<Location[]>) {
      state.routePolylines = action.payload;
    },
    setDistanceInfo(state, action: PayloadAction<DistanceInfo | null>) {
      state.distanceInfo = action.payload;
    },
    setSocketConnected(state, action: PayloadAction<boolean>) {
      state.isSocketConnected = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetTrip(state) {
      state.pickupLocation = null;
      state.dropLocation = null;
      state.driverLocation = null;
      state.status = 'idle';
      state.routePolylines = [];
      state.distanceInfo = null;
      state.error = null;
    },
    // Action trigger for middleware
    startTripTrigger(state, _action: PayloadAction<{ pickup: Location; drop: Location }>) {
      state.status = 'searching';
    },
  },
});

export const {
  setPickupLocation,
  setDropLocation,
  setDriverLocation,
  setTripStatus,
  setRoutePolylines,
  setDistanceInfo,
  setSocketConnected,
  setError,
  resetTrip,
  startTripTrigger,
} = tripSlice.actions;

export default tripSlice.reducer;

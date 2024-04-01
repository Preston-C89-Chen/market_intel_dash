import { configureStore } from '@reduxjs/toolkit';
import cotReportsReducer from './features/cotReportsSlice'; // Assuming you have a slice for COT reports

export const store = configureStore({
  reducer: {
    cotReports: cotReportsReducer,
    // Add other reducers here
  },
});
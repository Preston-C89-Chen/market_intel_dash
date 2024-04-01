import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCOT } from '../../app/api/graphql/cotQueries';


export const fetchCOTReportAction = createAsyncThunk("cotReports/fetchCOTReports", fetchCOT);

const cotReportsSlice = createSlice({
  name: 'cotReports',
  initialState: {
    reports: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCOTReportAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCOTReportAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchCOTReportAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  }
});

export default cotReportsSlice.reducer;
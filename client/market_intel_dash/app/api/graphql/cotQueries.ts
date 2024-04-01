import client from './apolloClient';
import { gql } from '@apollo/client';
const GET_COT_REPORTS_QUERY = gql`
  query GetCOTReports($from: String!, $to: String!) {
    getCOTReports(from: $from, to: $to) {
      asset
      asOfDate
      cftcMarketCode
      openInterestAll
      noncommercialPositionsLongAll
      noncommercialPositionsShortAll
      commercialPositionsLongAll
      commercialPositionsShortAll
      totalReportablePositionsLongAll
      totalReportablePositionsShortAll
      nonreportablePositionsLongAll
      nonreportablePositionsShortAll
      openInterestOld
      noncommercialPositionsLongOld
      noncommercialPositionsShortOld
      commercialPositionsLongOld
      commercialPositionsShortOld
      totalReportablePositionsLongOld
      changeInOpenInterestAll
      changeInCommercialLongAll
      percentOfOpenInterestAll
      changeInCommercialShortAll
      percentOfOINoncommercialLongAll
      percentOfOINoncommercialShortAll
      percentOfOICommercialLongAll
      percentOfOICommercialShortAll
      tradersNoncommercialLongAll
      tradersNoncommercialShortAll
      tradersCommercialLongAll
      tradersTotalOld
      contractUnits
    }
  }
`;

export const fetchCOT = async({from, to},{rejectWithValue}) => {

  try {
    const { data } =  await client.query({
      query: GET_COT_REPORTS_QUERY,
      variables: {from,to}
    });
    return data.getCOTReports
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
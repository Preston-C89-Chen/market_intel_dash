const { FinancialReportsAPI, SupabaseAPI } = require('../orm/index');

const fetchBalanceSheetData = async ({symbol}) => {
  try {
    const fmp = new FinancialReportsAPI();
    const response = await fmp.getBalanceSheetStatement(symbol);
    return response;
  } catch (err) {
    console.error(err)
  }
}

const fetchEarningsData = async ({fromDate,toDate}) => {
  try {
    const fmp = new FinancialReportsAPI();
    const response = await fmp.getEarnings(fromDate,toDate);
  } catch (err) {
    console.error(err);
  }
};

const resolvers = {
  Query: {
    balanceSheets: async(_, {symbol},) => {
      const balanceSheetData = await fetchBalanceSheetData({symbol:symbol});
      return balanceSheetData;
    },
    balanceSheet: async(_,{symbol}) => {
      try {
        const balanceSheetData = await fetchBalanceSheetData({symbol:symbol});
        return balanceSheetData;
      } catch(err) {
        console.error(err)
      }
    },
    earningsCalendar: async(_,{from, to}) => {
      const supaClient = new SupabaseAPI();
      try {
        let data;
        if (from && to) {
          data = await supaClient.fetch_earnings(from,to)
        } else {
          throw new Error("Must provide from to arguments, or symbol")
        }
        return data;
      } catch(err) {
        throw err;
      }
    },
    getCOTReports: async(_,{from, to, asset}) => {
      const supaClient = new SupabaseAPI();
      try {
        let data;
        if (asset && from && to) {
          data = await supaClient.fetch_cot(from, to, asset);
        } else if (from && to) {
          data = await supaClient.fetch_cot(from, to);
        }
        return data;
      } catch(err) {
        throw err;
      }
    }
  }
}

module.exports = resolvers;

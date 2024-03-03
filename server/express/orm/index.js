/*
https://site.financialmodelingprep.com/developer/docs
working from this site
*/

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { RESTDataSource } = require('@apollo/datasource-rest');
const { createClient } = require('@supabase/supabase-js');
const { CSV } = require('./csv');
const { restClient } = require('@polygon.io/client-js');

require('dotenv').config();


class FinancialReportsAPI extends RESTDataSource { 
  constructor() {
    if (FinancialReportsAPI.instance) {
      return FinancialReportsAPI.instance
    }
    FinancialReportsAPI.instance = this;
    super()
    this.apiKey = process.env.FMP_API_KEY;
    this.baseUrl = 'https://financialmodelingprep.com/api';
}

  async getBalanceSheetStatement(symbol) {
      const url = `${this.baseUrl}/v3/balance-sheet-statement/${symbol}?period=annual&apikey=${this.apiKey}`;
      const response = await this.get(url);
      console.log('inside updated api',response)
      return response;
  }

  async getBalanceSheetStatement(symbol) {
    const url = `${this.baseUrl}/v3/balance-sheet-statement/${symbol}?period=annual&apikey=${this.apiKey}`;
    const response = await this.get(url);
    return response;
  }

  async getEarnings(from,to) {
    //yyyy-mm-dd
    const url = `${this.baseUrl}/v3/earning_calendar?from=${from}&to=${to}&apikey=${this.apiKey}`;
    const response = await this.get(url);
    return response;
  }

  async getStockPeers(symbol) {
    const url = `${this.baseURL}/v3/`
  }
}

class PolygonAPI {
  constructor() {
    if (PolygonAPI.instance) {
      return PolygonAPI.instance;
    }
    PolygonAPI.instance = this;
    this.apiKey = process.env.POLYGON_API_KEY || "RJ_gcoDqtkNxGwvpRXeqDBLqqYj6Gzuv";
    this.client = {};
    this.baseURL = "https://api.polygon.io";
    this.__init();
  }

  __init() {
    console.log("got api key", this.apiKey)
    this.client = restClient(this.apiKey)
  }

  async fetchHistoricalData(symbol) {
    try {
      const response = await this.client.reference.t
    }
  }

  async getCorrelations({pair}) {
    const stock1 = pair[0];
    const stock2 = pair[1]
    try {
      const correlations = await this.client.reference.tickers({ ticker })
      return correlations;
    } catch(err) {
      console.error(err)
      return console.log(err);
    }
  }
}


class SupabaseAPI {
  constructor() {
    if (SupabaseAPI.instance) {
      return SupabaseAPI.instance;
    }

    SupabaseAPI.instance = this;
    this.apiKey = process.env.SUPA_KEY || ""
    this.client = {}
    this._init();
  }

  _init() {
    this.client = createClient('https://qbabpcqgxhxppvetnngb.supabase.co',this.apiKey);
  }

  async insert() {
    const timestamp = Date.now();
    try {
      const { data, error } = await this.client
      .from('fin_reports')
      .insert({ symbol: 'PLTR', financials: {"test":1}, correlations: {"test":2} })
      .select();
      return data;
    } catch(err) {
      console.error(err);
    }
  }

  async insert_earnings(earningsData) {
    console.log("earningsData",earningsData)
    try {
      const { data: insertData, error } = await this.client
      .from('earnings')
      .insert(earningsData)
      .select();
      console.log('Batch insert success:', insertData);
      if (error) throw new Error(error.message);
      return insertData;
    } catch (err) {
      console.error('Error Performing batch insert:', err)
    }
  }

  async fetch_earnings(from, to) {
    try {
      const { data, error } = await this.client
        .from('earnings')
        .select("*")
        .gte("date", from)
        .lte("date", to)
        if (error) {
          console.error('Error fetching earnings:', error);
          return null;
        }
      
        return data;
    } catch(error) {
      console.error('Error Performing batch insert:', error)
    }
  }

  async fetch(query) {
    const symbol = query?.symbol
    console.log("symbol", symbol);
    try {
      const { data, error } = await this.client
      .from('fin_reports')
      .select();
      return data;
    } catch(err) {
      console.error(err);
    }
  }
}

async function fetchCreateEarningsCSV() {
  const uniqueId = Date.now();
    // Ensure the csv directory exists
  const dirPath = path.join(__dirname, '..', 'csv');
  const fra = new FinancialReportsAPI();
  const earnings = await fra.getEarnings("2024-03-01","2024-03-31");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    }
  let filePath = path.join(dirPath, `earnings-${uniqueId}.csv`);
  const csv = new CSV(earnings,filePath)
  await csv.createCSVF();
}  

async function readInsertEarningsCSV() {
  let filePath = "/Users/prestonchen/Development/app.stock_analysis/server/express/csv/earnings-1708490006653.csv"
  const csv = new CSV(null,filePath);
  await csv.parse((data,error) => {
    const supaClient = new SupabaseAPI();
    supaClient.insert_earnings(data);
  });
}

async function fetchEarnings() {
  const startDate = '2024-03-01';
  const endDate = '2024-03-20';
  const supaClient = new SupabaseAPI();
  const res = await supaClient.fetch_earnings(startDate,endDate);
  return res;
}

async function fetchPoly() {
  const polygonAPi = new PolygonAPI();
  const res = await polygonAPi.getCorrelations("AAPL")
  console.log(res)
}


//fetchCreateEarningsCSV().catch(console.error);
//fetchEarnings().catch(console.error);
fetchPoly()
module.exports.FinancialReportsAPI = FinancialReportsAPI;
module.exports.SupabaseAPI = SupabaseAPI;
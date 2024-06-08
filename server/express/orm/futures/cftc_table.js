//Field Description for Legacy/ Traditional Reports
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const { CSV } = require("../csv");
const { cotCols, cotRows } = require("./futures.data");
const { SupabaseAPI } = require('../index');
const COT_COLS =
  [ "Market and Exchange Names", "As of Date in Form YYMMDD", "As of Date in Form YYYY-MM-DD", "CFTC Contract Market Code", "CFTC Market Code in Initials", "CFTC Region Code", "CFTC Commodity Code", "Open Interest (All)", "Noncommercial Positions-Long (All)", "Noncommercial Positions-Short (All)", "Noncommercial Positions-Spreading (All)", "Commercial Positions-Long (All)", "Commercial Positions-Short (All)", "Total Reportable Positions-Long (All)", "Total Reportable Positions-Short (All)", "Nonreportable Positions-Long (All)", "Nonreportable Positions-Short (All)", "Open Interest (Old)", "Noncommercial Positions-Long (Old)", "Noncommercial Positions-Short (Old)", "Noncommercial Positions-Spreading (Old)", "Commercial Positions-Long (Old)", "Commercial Positions-Short (Old)", "Total Reportable Positions-Long (Old)", "Total Reportable Positions-Short (Old)", "Nonreportable Positions-Long (Old)", "Nonreportable Positions-Short (Old)", "Open Interest (Other)", "Noncommercial Positions-Long (Other)", "Noncommercial Positions-Short (Other)", "Noncommercial Positions-Spreading(Other)", "Commercial Positions-Long (Other)", "Commercial Positions-Short (Other)", "Total Reportable Positions-Long (Other)", "Total Reportable Positions-Short (Other)", "Nonreportable Positions-Long (Other)", "Nonreportable Positions-Short (Other)", "Change in Open Interest (All)", "Change in Noncommercial-Long (All)", "Change in Noncommercial-Short (All)", "Change in Noncommercial-Spreading (All)", "Change in Commercial-Long (All)", "Change in Commercial-Short (All)", "Change in Total Reportable-Long (All)", "Change in Total Reportable-Short (All)", "Change in Nonreportable-Long (All)", "Change in Nonreportable-Short (All)", "% OF Open Interest (OI) (All)", "% OF OI-Noncommercial-Long (All)", "% OF OI-Noncommercial-Short (All)", "% OF OI-Noncommercial-Spreading (All)", "% OF OI-Commercial-Long (All)", "% OF OI-Commercial-Short (All)", "% OF OI-Total Reportable-Long (All)", "% OF OI-Total Reportable-Short (All)", "% OF OI-Nonreportable-Long (All)", "% OF OI-Nonreportable-Short (All)", "% OF Open Interest (OI) (Old)", "% OF OI-Noncommercial-Long (Old)", "% OF OI-Noncommercial-Short (Old)", "% OF OI-Noncommercial-Spreading (Old)", "% OF OI-Commercial-Long (Old)", "% OF OI-Commercial-Short (Old)", "% OF OI-Total Reportable-Long (Old)", "% OF OI-Total Reportable-Short (Old)", "% OF OI-Nonreportable-Long (Old)", "% OF OI-Nonreportable-Short (Old)", "% OF Open Interest (OI) (Other)", "% OF OI-Noncommercial-Long (Other)", "% OF OI-Noncommercial-Short (Other)", "% OF OI-Noncommercial-Spreading (Other)", "% OF OI-Commercial-Long (Other)", "% OF OI-Commercial-Short (Other)", "% OF OI-Total Reportable-Long (Other)", "% OF OI-Total Reportable-Short (Other)", "% OF OI-Nonreportable-Long (Other)", "% OF OI-Nonreportable-Short (Other)", "Traders-Total (All", "Traders-Noncommercial-Long (All)", "Traders-Noncommercial-Short (All)", "Traders-Noncommercial-Spreading (All)", "Traders-Commercial-Long (All)", "Traders-Commercial-Short (All)", "Traders-Total Reportable-Long (All)", "Traders-Total Reportable-Short (All)", "Traders-Total (Old)", "Traders-Noncommercial-Long (Old)", "Traders-Noncommercial-Short (Old)", "Traders-Noncommercial-Spreading (Old)", "Traders-Commercial-Long (Old)", "Traders-Commercial-Short (Old)", "Traders-Total Reportable-Long (Old)", "Traders-Total Reportable-Short (Old)", "Traders-Total (Other)", "Traders-Noncommercial-Long (Other)", "Traders-Noncommercial-Short (Other)", "Traders-Noncommercial-Spreading (Other)", "Traders-Commercial-Long (Other)", "Traders-Commercial-Short (Other)", "Traders-Total Reportable-Long (Other)", "Traders-Total Reportable-Short (Other)", "Concentration-Gross LT = 4 TDR-Long (All)", "Concentration-Gross LT = 4 TDR-Short (All)", "Concentration-Gross LT =8 TDR-Long (All)", "Concentration-Gross LT =8 TDR-Short (All)", "Concentration-Net LT =4 TDR-Long (All)", "Concentration-Net LT =4 TDR-Short (All)", "Concentration-Net LT =8 TDR-Long (All)", "Concentration-Net LT =8 TDR-Short (All)", "Concentration-Gross LT =4 TDR-Long (Old)", "Concentration-Gross LT =4TDR-Short (Old)", "Concentration-Gross LT=8 TDR-Long (Old)", "Concentration-Gross LT=8 TDR-Short (Old)", "Concentration-Net LT =4 TDR-Long (Old)", "Concentration-Net LT =4 TDR-Short (Old)", "Concentration-Net LT =8 TDR-Long (Old)", "Concentration-Net LT =8 TDR-Short (Old)", "Concentration-Gross LT =4 TDR-Long (Other)", "Concentration-Gross LT =4 TDR-Short(Other)", "Concentration-Gross LT =8 TDR-Long (Other)", "Concentration-Gross LT =8 TDR-Short(Other)", "Concentration-Net LT =4 TDR-Long (Other)", "Concentration-Net LT =4 TDR-Short (Other)", "Concentration-Net LT =8 TDR-Long (Other)", "Concentration-Net LT =8 TDR-Short (Other)", "Contract Units", "CFTC Contract Market Code (Quotes)", "CFTC Market Code in Initials (Quotes)", "CFTC Commodity Code (Quotes)" ]


const getDateStr = () => {
  const now = new Date();
  const dateString = now.toISOString().split('T')[0];
  return dateString;
}

function writeJSON(txtData, dateStr) {
    const dateString = dateStr ? dateStr : getDateStr();
    fs.writeFile(`./data/${dateString}_cftc.json`, JSON.stringify(txtData, null, 2), (err) => {
      if (err) {
        console.error('Failed to write JSON file:', err);
      } else {
        console.log('JSON file has been saved.');
      }
    });
  }

function parseCftcData(txtData, cols) {
  const lines = txtData.trim().split('\n');
  const rows = lines.map((line) => {
    const values = line.split(',').map((value) => value.trim().replace(/^"|"$/g, ''));
    const rowObject = values.reduce((obj, value, i) => {
      if (cols[i]) {
        if (cols[i] === "As of Date in Form YYYY-MM-DD") {
          
        }
        obj[cols[i]] = value;
      }
      return obj
    }, {});
    return rowObject;
  });
  return rows;
}

function readJson(path) {
  return new Promise((resolve,reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        reject(err)
      }
      resolve(JSON.parse(data));
    });
  });
}

function parseData(line) {
  // Split the line into fields. Adjust the regex as needed to handle edge cases
  const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  if (!values) return [];

  return values.reduce((obj, value, i) => {
    if (COT_COLS[i]) {
      if (COT_COLS[i] === "As of Date in Form YYYY-MM-DD") {
        
      }
      obj[COT_COLS[i]] = value;
    }
    return obj
  }, {});
 
}

function processFile(filePath,symbol) {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      const lines = data.split('\n');
      const parsedData = lines.map(parseData);
      const groupedData = parsedData.reduce((memo,acc) => {
        let date = acc["As of Date in Form YYYY-MM-DD"];
        if(date in memo) {
          let dataName = acc["Market and Exchange Names"];
          if (symbol && symbol === "nq" && dataName.includes("NASDAQ MINI") ) {
            memo[date].push(acc);
          }
        } else {
          memo[date] = [];
        }
        return memo;
      }, {});
      writeJSON(groupedData,"NQ-2023")
      //console.log(groupedData);
      return groupedData;
      // Optionally, you can further process `parsedData` or save it to another file
  });
}


function readTxt(path) {
  return new Promise((resolve,reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      resolve(parseData(data));
    });
  });
}

async function createCFTC(fileName) {
  const jsonData = await readJson(fileName);
  const now = new Date();
  const dateString = now.toISOString();
  const filePath = `./${dateString}_cftc.csv`;
  const csvClient = new CSV(jsonData,filePath)
  const csvRes = await csvClient.jsonToCSV(jsonData,filePath);
  return csvRes;
}

async function getCBreport() {
  const csvClient = new CSV({},"./cb_transactions.csv");
  const cbData = await csvClient.readCBreport();
  const assetType = "ADA";
  const transactionType = "Buy"
  let count = 0;
  let q = 0;
  const adaSum = cbData.reduce((memo, row) => {
    if (row.Asset === "ALGO" && row.Spot_Currency === "USD") {
      console.log(row)
      count += 1;
      q += row.Quantity_Transacted;
      memo.qt = Number(row.Quantity_Transacted) + memo.qt || 0;
      memo.total = Number(row.Quantity_Transacted) + memo.total || 0;
      memo.avg =  Number(row.Spot_Price) + memo.avg || 0;
    }
    return memo;
  },{});
  adaSum.avg = adaSum.avg / count
  console.log("report summary", adaSum);
}

const tableCols = () => {
  return colFilter.reduce((memo,item, i) => {
    const row = {[item]: labels[i]}
    memo.push(row)
    return memo;
  },[])
}

async function uploadCFTC(fileName) {
  // filter the json data, and only return data where its in coilumns
  const jsonData = await readJson(fileName);
  //console.log(jsonData)
  const result = await jsonData.reduce((memo,item) => {
    const row = {};
//    console.log(item["Market and Exchange Names"])
    if (cotRows.includes(item["Market and Exchange Names"])) {
      for (let key in item) {
        if (key in cotCols) {
          console.log("cotCols[key]",cotCols[key])
          
          
          row[cotCols[key]] = item[key]

          console.log("memo")
        }
      }
    }
   
    if (Object.keys(row).length > 0) {
      memo.push(row)
    }
    return memo;
  },[]);
  console.log("result",result)
  const superClient = new SupabaseAPI();
  superClient.insert_data_table("cot_report",result);
  return result;
}

async function fetchCFTC(dateStr) {
  try {
    const { data } = await axios.get("https://www.cftc.gov/dea/newcot/deacom.txt");
    if (data.length > 0) {
      const cftcData = parseCftcData(data,COT_COLS,dateStr);
      console.log("cftcData",cftcData)
      writeJSON(cftcData,dateStr)
      return cftcData;
    }
  } catch(err) {
    console.log(err)
    return err;
  }
}


function formatDate(date,slashes) {
  // Format the date as mmddyy
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear().toString();
  if (slashes) {
    return `${month}/${day}/${year}`;
  }
  return month + day + year;
}

function getAllWeekday(year,dayNumber) {
  const weekdays = [];

  // Loop through each month from January (0) to December (11)
  for (let month = 0; month < 12; month++) {
      // Start from the first day of the month
      let date = new Date(year, month, 1);

      // Find the first Tuesday of the month
      while (date.getDay() !== dayNumber) {  // Day 2 of the week is Tuesday
          date.setDate(date.getDate() + 1);
      }

      // Continue adding each subsequent Tuesday of the month to the list
      while (date.getMonth() === month) {
        weekdays.push(formatDate(date,true));
          date.setDate(date.getDate() + 7);  // Move to the next Tuesday
      }
  }

  return weekdays;
}

function createURL(year, date) {
  return `https://www.cftc.gov/sites/default/files/files/dea/cotarchives/${year}/futures/deacmelf${date}.htm`;
}

function cotURLs(year) {
  let tuesdays = getAllWeekday(year,2);
  let urls = [];
  tuesdays.forEach((date) => {
    let url = createURL(year, date);
    urls.push({"date":date,"url":url});
  })
  return urls
}

//fetchCFTC("2024-05-07");
//uploadCFTC("./data/2024-05-07_cftc.json")
//parseCFTC();
// const txtData = fetchCFTC();
//getCBreport()

//createCFTC()
function getFridayFromDate(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay(); // Get day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  // Check if the day is Tuesday (2)
  if (dayOfWeek !== 2) {
      console.error('The provided date is not a Tuesday:', dateString);
      return null;
  }
  // Calculate the corresponding Friday date (Tuesday + 3 days)
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
}

async function batchCFTC(year) {
  try {
    const urls = cotURLs(year);
    urls.forEach(async (item) => {
      const { data } = await axios.get(item.url);
      if (data.length > 0) {
        const cftcData = parseCftcData(data, COT_COLS, item.date);
        console.log('rwriting json', cftcData)
        writeJSON(cftcData, item.date)
        return cftcData;
      }
    })
    
  } catch(err) {
    console.log(err)
    return err;
  }
}


async function getWeeklyClose() {
  let filePath = "./HistoricalData_1713843702690.csv";
  const weekCloseDates = getAllWeekday("2023",5)
  console.log(weekCloseDates)
  const csv = new CSV(null,filePath);
  const results = [];
  //console.log(weekCloseDates)
  return await csv.parse((data,error) => {
    data.reduce((memo,acc) => {
      if (weekCloseDates.includes(acc.Date)) {
        results.push(memo);
      }
      return memo;
    },[]);
    //console.log(data);
  });
}
//processFile("./f2023.txt","nq");
//console.log(getAllWeekday("2023",5))
async function processResults() {
  try {
    const results = await getWeeklyClose();
    //console.log(results); // Now results should correctly contain the array from the CSV parsing
  } catch (error) {
    console.error('Error processing CSV data:', error);
  }
}
processResults()
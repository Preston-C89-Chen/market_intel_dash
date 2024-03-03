const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const csv = require('csv-parser');

class CSV {
  constructor(data, filePath) {
    this.data = data;
    this.filePath = filePath
  }

  async createCSV(data) {
    const dates = [...new Set(data.map((item) => item.data))];
  }

  async createCSVF() {
    const csvWriter = createObjectCsvWriter({
      path: this.filePath,
      header: [
        {id: 'date', title: 'date'},
        {id: 'symbol', title: 'symbol'},
        {id: 'revenue', title: 'revenue'},
        {id: 'eps', title: 'eps'},
        {id: 'time', title: 'time'},
        {id: 'revenueEstimated', title: 'revenueestimated'}
      ]
    });

    try {
      console.log('writing this data', this.data, this.filePath)
      const csvRes = await csvWriter.writeRecords(this.data);
      return csvRes
      console.log('The CSV file was written successfully');
    } catch (err) {
      console.error('Error writing CSV file', err);
    }
  }

  async parse(callback) {
    const results = [];
    fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        callback(results, null);
      })
      .on('error', (error) => {
        callback(null, error);
      })
  }  
}

module.exports.CSV = CSV;
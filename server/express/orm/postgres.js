const { Pool } = require('pg');
require('dotenv').config();

let { PGURL } = process.env;

const pool = new Pool({
  connectionString: PGURL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}
getPgVersion();
require('dotenv').config();
const mysql = require('mysql2/promise');

// Create the connection pool to the database
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL
});

pool.getConnection()
  .then(() => console.log('Connected to database in db.js'))
  .catch(err => console.error('Error connecting to database:', err));

module.exports = pool;

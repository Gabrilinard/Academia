const mysql = require('mysql2');

const dbPromise = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Medusawebby210',
  database: 'academia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = dbPromise;


const mysql = require('mysql2');

const pool = mysql.createPool({
  host: Process.env.DB_HOST,
  user:Process.env.DB_USER,
  password:Process.env.DB_PASSWORD ,
  database: Process.env.DB_NAME
});

module.exports = pool.promise();
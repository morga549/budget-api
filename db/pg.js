const { Pool } = require('pg');
const types = require('pg').types; 

types.setTypeParser(1700, function(val) {
  return parseFloat(val);
})

types.setTypeParser(23, (val) => {
    return parseInt(val);
})

const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const query = (text, params) => {
    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((result) => {
                resolve(result.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
module.exports = {
    query: query
}
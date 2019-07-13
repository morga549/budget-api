const { Pool } = require('pg');

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
                resolve(result.rows[0]);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
module.exports = {
    query: query
}
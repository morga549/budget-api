const { Pool } = require('pg');
const types = require('pg').types;
const secrets = require('../utils/secrets');

//added pg.types because int and float columns were coming back as string
types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});
  
types.setTypeParser(23, (val) => {
    return parseInt(val);
});

const query = async (text, params) => {
    const db_secrets = await secrets.getSecrets();
    
    const pool = new Pool({ 
        host: db_secrets.db_host,
        database: db_secrets.db_name,
        user: db_secrets.db_user,
        password: db_secrets.db_password,
        max: 5,
        idleTimeoutMillis: 30000,   
        connectionTimeoutMillis: 2000,
        });
    return pool.query(text,params);
};

module.exports = {
    query
}
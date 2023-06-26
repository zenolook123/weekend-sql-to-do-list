const pg = require('pg');

// Setting up pg to connect to the database
let pool;
if (process.env.DATABASE_URL) {
    pool = new pg.Pool ({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized:false
        }
    })
} else {
    pool = new pg.Pool({
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432
    });
}


// Exporting pool for use in server
module.exports = pool
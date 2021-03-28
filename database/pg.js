const pg = require('pg')
const Pool = pg.Pool;

const pool = new Pool({
    database: process.env.DATABASE || "vovoca",
    port: 5432,
    host: process.env.HOST || "localhost",
    user: process.env.USER || "postgres",
    password: process.env.MASTER_PASSWORD || process.env.PASSWORD,
    connectionString: process.env.DATABASE_URI
})

module.exports = pool
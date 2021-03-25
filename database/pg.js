const pg = require('pg')
const Pool = pg.Pool;

const pool = new Pool({
    database: "vovoca",
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: process.env.MASTER_PASSWORD
})

module.exports = pool
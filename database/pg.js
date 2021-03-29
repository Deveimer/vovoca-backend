const pg = require('pg')
const Pool = pg.Pool;

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? connectionString : process.env.DATABASE_URL,
    ssl: isProduction
})
pool.connect(() => {
    console.log("Database is up");
})

module.exports = pool
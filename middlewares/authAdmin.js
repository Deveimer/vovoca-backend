const jwt = require('jsonwebtoken')
const pool = require('../database/pg')

module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token') || req.cookies.token

    if (!token)
        return res.status(401).json({ msg: "Unathorised Access" })
    try {
        const decoded = jwt.verify(token, process.env.MASTER_PASSWORD)
        const result = await pool.query("SELECT * FROM admin WHERE _id = $1", [decoded.user])
        if (result.rows.length === 0)
            throw Error("User not an admin")
        req.user = decoded.user
        next()
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Token is not Valid"})
    }
}
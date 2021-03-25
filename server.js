const express = require('express')
const server = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cp = require("cookie-parser")

server.use(cors())
server.use(cp())
server.use(express.json())

server.use('/api/music', require("./router/music"))
server.use('/api/admin', require("./router/admin"))

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`Server is live on ${PORT}`))
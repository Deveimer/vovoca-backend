const express = require('express')
const server = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

server.use(cors())

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`Server is live on ${PORT}`))
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const dotenv = require('dotenv')

// Config details
dotenv.config({ path: './config.env' })

const app = express()
const publicDirectory = path.join(__dirname, '/public')
app.use(express.static(publicDirectory))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'hbs')
app.use('/', require('./routes/pages'))

const hostPort = process.env.host_port || 5001

app.listen(hostPort, () => {
    console.log(`Server started on port ${hostPort}`)
})
import express = require('express')
import db = require('./data/queries')
//import dotenv => To read vars from ENV

const app = express()
const port = 8000

/*
app.get('/', (req, res) => {
  res.send('Hello!')
})
*/

app.post('/nmea', (req, res) => {
  db.postNMEA()
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`App started! Listening on port ${port}`)
})

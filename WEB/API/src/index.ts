import express = require('express')
//import bcrypt = require('bcrypt')
//import Database = require('./data/queries')
//import dotenv => To read vars from ENV
/*interface Database {
  Database: typeof Database
}*/

import Test from './test'
const tst = new Test('asd')
tst.print()

const app = express()
const port = 8000

/*const db = new Database() /*{
  user: 'username',
  password: 'password',
  host: 'localhost',
  database: 'nmea_data',
  port: 5432
})*/

app.get('/', (req, res) => {
  res.send('Hello!')
})

/*app.get('/user', (req, res) => {
  const username = 'jasu' // TODO: Min/max length
  const password = 'password' // TODO: Min/max length
  bcrypt
    .hash(password, 10)
    .then((hash: string) => db.postUser(username, hash))
    .then(() => {
      res.send('Hello!')
    })
    .catch((err: Error) => {
      console.log(err) // TODO: Log?
    })
})*/

/*const compare = (password: String, hash: String) => {
  bcrypt.compare(password, hash)
}

const hashWithSalt = (password: String) => {
  bcrypt.hash(password, 10)
}*/

/*app.post('/nmea', (req, res) => {
  db.postNMEA()
  res.send('Hello!')
})*/

app.listen(port, () => {
  console.log(`App started! Listening on port ${port}`)
})

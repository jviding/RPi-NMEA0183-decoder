import express = require('express')
//import bcrypt = require('bcrypt')
import Queries from './queries/queries'
import Endpoints from './endpoints/endpoints'
//import dotenv => To read vars from ENV

// TODO: How to handle secrets/configs?
// Use ENV? https://node-postgres.com/apis/client
const postgresConfig = {
  user: 'username',
  password: 'password',
  host: 'localhost',
  database: 'nmea_data',
  port: 5432
}

const dbClient = new Queries(postgresConfig)
const api = new Endpoints(dbClient)

const app = express()
const port = 8000

const catchExceptions = (callback: Function) => // eslint-disable-line
  (req: express.Request, res: express.Response) => // eslint-disable-line
    callback(req, res).catch((err: any) => res.send(err)) // eslint-disable-line
// TODO: Log errors, or what?

// --- BOATS ---
app.get('/boats', catchExceptions(api.boats.getAll))
app.get('/boats/b-:id', catchExceptions(api.boats.getByID))
app.get('/boats/u-:id', catchExceptions(api.boats.getByUser))
app.get('/boats/post', catchExceptions(api.boats.create))
// delete
// update

// --- USERS ---
app.get('/users', catchExceptions(api.users.getAll))
app.get('/users/:id', catchExceptions(api.users.getOne))
app.get('/post/users', catchExceptions(api.users.create))
app.delete('/users/:id', catchExceptions(api.users.delete))
// update

// --- TRIPS ---
app.get('/trips', catchExceptions(api.trips.getAll))
app.get('/trips/t-:id', catchExceptions(api.trips.getByID))
app.get('/trips/b-:id', catchExceptions(api.trips.getByBoat))
app.get('/post/trips', catchExceptions(api.trips.create))

// --- NMEA_DATA ---
// get
// save

// TODO: app.use(isAuthenticated)
// TODO: Collect HTTP logs?

app.listen(port, () => {
  console.log(`App started! Listening on port ${port}`)
})

import express = require('express')
import session = require('express-session')
import sessionStore = require('connect-pg-simple')
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

app.use(express.json())
app.use(
  // TODO: Add maxAge, sameSite, secure(?) - store: add errorLog
  session({
    store: new (sessionStore(session))({
      pool: dbClient.pool,
      tableName: 'user_sessions',
      pruneSessionInterval: 600 // 10min
    }),
    secret: 'someSuperSecretInput', // TODO: Use env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    name: 'Bisquit',
    unset: 'destroy'
  })
)

// --- AUTH ---
app.post('/login', catchExceptions(api.users.login))
app.post('/logout', catchExceptions(api.users.logout))

// --- BOATS ---
app.get('/boats', catchExceptions(api.boats.getAll))
app.get('/boats/my', catchExceptions(api.boats.get))
app.get('/boats/b-:boatId', catchExceptions(api.boats.getByID))
app.get('/boats/u-:userId', catchExceptions(api.boats.getByUser))
app.post('/boats', catchExceptions(api.boats.create))
app.delete('/boats/:boatId', catchExceptions(api.boats.delete))
// TODO: update boat

// --- USERS ---
app.get('/users', catchExceptions(api.users.getAll))
app.get('/users/me', catchExceptions(api.users.get))
app.get('/users/u-:userId', catchExceptions(api.users.getByID))
app.post('/users', catchExceptions(api.users.create))
app.delete('/users/:userId', catchExceptions(api.users.delete)) // TODO: Admin function? How for users?
// TODO: update user

// --- TRIPS ---
app.get('/trips', catchExceptions(api.trips.getAll))
app.get('/trips/t-:tripId', catchExceptions(api.trips.getByID))
app.get('/trips/b-:boatId', catchExceptions(api.trips.getByBoat))
app.post('/trips', catchExceptions(api.trips.create))
app.delete('/trips/:tripId', catchExceptions(api.trips.delete))
// TODO: update trip

// --- NMEA_DATA ---
app.get('/nmea/:tripId', catchExceptions(api.nmea.getByTrip))
app.post('/nmea', catchExceptions(api.nmea.create))
// TODO: get nmea
// TODO: save nmea

// TODO: app.use(isAuthenticated)
// TODO: Collect HTTP logs?
// TODO: Cookies, CSRF, Headers, etc. ?
// TODO: Login, forgot password

// --- ADMIN --- // TODO: Admin site, move some of above functions here?

app.listen(port, () => {
  console.log(`App started! Listening on port ${port}`)
})

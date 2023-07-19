import postgres = require('pg')
import Boats from './boats/boats'
import Users from './users/users'
import Trips from './trips/trips'
import Nmea from './nmea-data/nmea-data'

export default class Queries {
  pool: postgres.Pool
  boats: Boats
  users: Users
  trips: Trips
  nmea: Nmea

  constructor(config: object) {
    this.pool = new postgres.Pool(config)
    this.boats = new Boats(this.pool)
    this.users = new Users(this.pool)
    this.trips = new Trips(this.pool)
    this.nmea = new Nmea(this.pool)
  }
}

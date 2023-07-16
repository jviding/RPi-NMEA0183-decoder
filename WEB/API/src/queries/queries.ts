import postgres = require('pg')
import Boats from './boats/boats'
import Users from './users/users'
import Nmea from './nmea-data/nmea-data'

export default class Queries {
  boats: Boats
  users: Users
  nmea: Nmea

  constructor(config: object) {
    const database = new postgres.Pool(config)
    this.boats = new Boats(database)
    this.users = new Users(database)
    this.nmea = new Nmea(database)
  }
}

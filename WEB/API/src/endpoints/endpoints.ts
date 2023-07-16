import Queries from '../queries/queries'
import Boats from './boats/boats'
import Users from './users/users'
import Nmea from './nmea-data/nmea-data'

export default class Endpoints {
  boats: Boats
  users: Users
  nmea: Nmea

  constructor(database: Queries) {
    this.boats = new Boats(database)
    this.users = new Users(database)
    this.nmea = new Nmea(database)
  }
}

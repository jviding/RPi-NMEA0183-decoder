import postgres = require('pg')

export default class Trips {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  getByID = (tripId: string) =>
    this.database.query({
      text: 'SELECT id, name, timestamp, boat_id FROM trips WHERE id=$1',
      values: [tripId]
    })

  getByBoat = (boatId: string) =>
    this.database.query({
      text: 'SELECT id, name, timestamp, boat_id FROM trips WHERE boat_id=$1',
      values: [boatId]
    })

  getAll = () =>
    this.database.query({
      text: 'SELECT id, name, timestamp, boat_id FROM trips',
      values: []
    })

  // TODO: getLatest -> highest trip_id ?
  // But need to know if continuing existing, i.e., <10min from latest nmea packet
  // Do a search to nmea data...

  create = (name: string, timestamp: number, boatId: number) =>
    this.database.query({
      text: 'INSERT INTO trips(name, timestamp, boat_id) VALUES($1, $2, $3) RETURNING id',
      values: [name, timestamp, boatId]
    })

  delete = (tripId: string) =>
    this.database.query({
      text: 'DELETE FROM trips WHERE id=$1',
      values: [tripId]
    })

  // TODO: update
}

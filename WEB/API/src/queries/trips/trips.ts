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

  // getLatest -> highest trip_id, then search

  create = (name: string, timestamp: number, boatId: number) =>
    this.database.query({
      text: 'INSERT INTO trips(name, timestamp, boat_id) VALUES($1, $2, $3) RETURNING id',
      values: [name, timestamp, boatId]
    })

  // getOne
  // getAll
  // create
  // delete
  // update
}

import postgres = require('pg')

export default class Boats {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  // getOne
  // getAll
  // create
  // delete
  // update
}

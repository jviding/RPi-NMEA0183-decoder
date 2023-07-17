import postgres = require('pg')

export default class Boats {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  getByID = (boatId: string) =>
    this.database.query({
      text: 'SELECT id, name, type, user_id FROM boats WHERE id=$1',
      values: [boatId]
    })

  getByUser = (userId: string) =>
    this.database.query({
      text: 'SELECT id, name, type, user_id FROM boats WHERE user_id=$1',
      values: [userId]
    })

  getAll = () =>
    this.database.query({
      text: 'SELECT id, name, type, user_id FROM boats',
      values: []
    })

  create = (name: string, type: string, userId: number) =>
    this.database.query({
      text: 'INSERT INTO boats(name, type, user_id) VALUES($1, $2, $3)',
      values: [name, type, userId]
    })

  delete = (boatId: string) =>
    this.database.query({
      text: 'DELETE FROM boats WHERE id=$1',
      values: [boatId]
    })

  // update
}

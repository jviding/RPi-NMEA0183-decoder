import postgres = require('pg')

export default class Users {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  getByID = (userId: string) =>
    this.database.query({
      text: 'SELECT id, username, email FROM users WHERE id=$1',
      values: [userId]
    })

  getAll = () =>
    this.database.query({
      text: 'SELECT id, username, email FROM users',
      values: []
    })

  getUserPassword = (username: string) =>
    this.database.query({
      text: 'SELECT id, password_hash FROM users WHERE username=$1',
      values: [username]
    })

  create = (username: string, passwordHash: string, email: string) =>
    this.database.query({
      text: 'INSERT INTO users(username, password_hash, email) VALUES($1, $2, $3) RETURNING id',
      values: [username, passwordHash, email]
    })

  delete = (userId: string) =>
    this.database.query({
      text: 'DELETE FROM users WHERE id=$1',
      values: [userId]
    })

  // TODO: Update
  // Separate for password?
  // Allow changing username?
}

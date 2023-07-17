import express = require('express')
import bcrypt = require('bcrypt')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class Users {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  getOne = (req: Request, res: Response) => {
    const userId = req.params.id
    return this.database.users.getOne(userId).then((data) => res.send(data.rows))
  }

  getAll = (req: Request, res: Response) => this.database.users.getAll().then((data) => res.send(data.rows))

  create = (req: Request, res: Response) => {
    // TODO: Username/Password min max length
    const { username, password, email } = req.body
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => this.database.users.create(username, hash, email))
      .then(() => res.status(201).send())
  }

  delete = (req: Request, res: Response) => {
    const userId = req.params.id
    return this.database.users.delete(userId).then(() => res.status(204).send())
  }

  // TODO: update
}

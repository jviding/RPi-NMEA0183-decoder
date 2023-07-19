import express = require('express')
import Queries from '../../queries/queries'
import { hash } from '../password'
import { authenticate } from '../auth'

type Request = typeof express.request
type Response = typeof express.response

export default class Users {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  getOne = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.users.getOne(userId).then(({ rows }) => res.send(rows))
  }

  getAll = (req: Request, res: Response) => this.database.users.getAll().then(({ rows }) => res.send(rows))

  create = (req: Request, res: Response) => {
    // TODO: Username/Password min max length
    const { username, password, email } = req.body
    return hash(password)
      .then((hash) => this.database.users.create(username, hash, email))
      .then(({ rows }) => authenticate(req, rows[0].id))
      .then(() => res.status(201).send())
  }

  delete = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.users.delete(userId).then(() => res.status(204).send())
  }

  // TODO: update
}

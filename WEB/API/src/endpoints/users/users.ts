import express = require('express')
import bcrypt = require('bcrypt')
import Queries from '../../queries/queries'
import { createSession } from './sessions'

type Request = typeof express.request
type Response = typeof express.response

export default class Users {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  login = (req: Request, res: Response) => {
    const { username, password } = req.body
    return this.database.users
      .getUserPassword(username)
      .then(({ rows }) => bcrypt.compare(password, rows[0].password_hash).then(() => rows[0]))
      .then(({ id }) => createSession(req, id))
      .then(() => res.send())
  }

  // login
  // logout
  // register
  // change pwd

  getOne = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.users.getOne(userId).then(({ rows }) => res.send(rows))
  }

  getAll = (req: Request, res: Response) => this.database.users.getAll().then(({ rows }) => res.send(rows))

  create = (req: Request, res: Response) => {
    // TODO: Username/Password min max length
    const { username, password, email } = req.body
    return bcrypt
      .hash(password, 10)
      .then((hash) => this.database.users.create(username, hash, email))
      .then(({ rows }) => createSession(req, rows[0].id))
      .then(() => res.status(201).send())
  }

  delete = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.users.delete(userId).then(() => res.status(204).send())
  }

  // TODO: update
}

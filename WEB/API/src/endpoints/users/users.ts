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
    const userId = req.params.userId
    return this.database.users.getOne(userId).then(({ rows }) => res.send(rows))
  }

  getAll = (req: Request, res: Response) => this.database.users.getAll().then(({ rows }) => res.send(rows))

  create = (req: Request, res: Response) => {
    // TODO: Username/Password min max length
    const { username, password, email } = req.body
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => this.database.users.create(username, hash, email))
      .then(({ rows }) => this._createSession(req, rows[0].id))
      .then(() => res.status(201).send())
  }

  delete = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.users.delete(userId).then(() => res.status(204).send())
  }

  // TODO: update

  _createSession = (req: Request, userId: string) => {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(`Session regeneration failed for user ${userId}`)
        req.session.user = userId
        req.session.save((err) => {
          if (err) reject(`Couldn't save the session for user ${userId}`)
          resolve(true)
        })
      })
    })
  }
}

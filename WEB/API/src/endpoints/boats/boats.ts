import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class Boats {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  get = (req: Request, res: Response) => {
    req.params.userId = req.session.userId || ''
    return this.getByUser(req, res)
  }

  getByID = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this.database.boats.getByID(boatId).then(({ rows }) => res.send(rows))
  }

  getByUser = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.boats.getByUser(userId).then(({ rows }) => res.send(rows))
  }

  getAll = (req: Request, res: Response) => this.database.boats.getAll().then(({ rows }) => res.send(rows))

  create = (req: Request, res: Response) => {
    // TODO: Name/Type min max length
    // TODO: Create token
    const { name, type } = req.body
    const userId = req.session.userId || ''
    return this.database.boats.create(name, type, userId).then(({ rows }) => res.status(201).send(rows[0]))
  }

  delete = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this.database.boats.delete(boatId).then(() => res.status(204).send())
  }

  // TODO: update
  // TODO: rotate token?
}

import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class Boats {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  getByID = (req: Request, res: Response) => {
    const boatId = req.params.id
    return this.database.boats.getByID(boatId).then((data) => res.send(data.rows))
  }

  getByUser = (req: Request, res: Response) => {
    const userId = req.params.id
    return this.database.boats.getByUser(userId).then((data) => res.send(data.rows))
  }

  getAll = (req: Request, res: Response) => this.database.boats.getAll().then((data) => res.send(data.rows))

  create = (req: Request, res: Response) => {
    // TODO: Name/Type min max length
    const name = 'Black Pearl'
    const type = 'X-99'
    const userId = 1
    return this.database.boats.create(name, type, userId).then(() => res.status(201).send())
  }

  // getOne
  // getAll

  // create
  // delete
  // update
}

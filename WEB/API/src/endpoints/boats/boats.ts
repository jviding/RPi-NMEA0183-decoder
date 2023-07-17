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
    const boatId = req.params.boatId
    return this.database.boats.getByID(boatId).then((data) => res.send(data.rows))
  }

  getByUser = (req: Request, res: Response) => {
    const userId = req.params.userId
    return this.database.boats.getByUser(userId).then((data) => res.send(data.rows))
  }

  getAll = (req: Request, res: Response) => this.database.boats.getAll().then((data) => res.send(data.rows))

  create = (req: Request, res: Response) => {
    // TODO: Name/Type min max length
    // TODO: Change to reading user ID from Cookie !!
    const { name, type, userId } = req.body
    return this.database.boats.create(name, type, userId).then(() => res.status(201).send())
  }

  delete = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this.database.boats.delete(boatId).then(() => res.status(204).send())
  }

  // TODO: update
}

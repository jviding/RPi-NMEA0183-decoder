import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class BoatTrips {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  getByID = (req: Request, res: Response) => {
    const tripId = req.params.tripId
    return this.database.trips.getByID(tripId).then(({ rows }) => res.send(rows))
  }

  getByBoat = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this.database.trips.getByBoat(boatId).then(({ rows }) => res.send(rows))
  }

  getAll = (req: Request, res: Response) => this.database.trips.getAll().then(({ rows }) => res.send(rows))

  create = (req: Request, res: Response) => {
    const { name, boatId } = req.body
    const timestamp = Date.now()
    return this.database.trips.create(name, timestamp, boatId).then(({ rows }) => res.status(201).send(rows[0]))
  }

  delete = (req: Request, res: Response) => {
    const tripId = req.params.tripId
    return this.database.trips.delete(tripId).then(() => res.status(204).send())
  }

  // TODO: getLatest ?
  // TODO: update
}

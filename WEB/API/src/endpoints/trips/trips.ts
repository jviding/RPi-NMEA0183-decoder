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
    const tripId = req.params.id
    return this.database.trips.getByID(tripId).then((data) => res.send(data.rows))
  }

  getByBoat = (req: Request, res: Response) => {
    const boatId = req.params.id
    return this.database.trips.getByBoat(boatId).then((data) => res.send(data.rows))
  }

  getAll = (req: Request, res: Response) => this.database.trips.getAll().then((data) => res.send(data.rows))

  create = (req: Request, res: Response) => {
    const name = 'Trip'
    const timestamp = Date.now()
    const boatId = 1
    return this.database.trips.create(name, timestamp, boatId).then((data) => res.status(201).send(data.rows))
  }

  // getLatest ?
  // create
  // delete
  // update
}

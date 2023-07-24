import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class BoatTrips {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  /*get = (req: Request, res: Response) => {
    const tripId = req.params.tripId
    return this.database.trips.getByID(tripId).then(({ rows }) => res.send(rows))
  }*/
  // TODO: Miten näytetään? Trip ei voi nyt hakea userId perusteella
  // Access controls ongelma, vaikeampi validoida
  // Samaan hakuun, että palauttaa veneet ja jokaisen veneen tripit?
  // Pitää samalla miettiä, miten UI rakennetaan...

  getByID = (req: Request, res: Response) => {
    const tripId = req.params.tripId
    return this.database.trips.getByID(tripId).then(({ rows }) => res.send(rows))
  }

  getByBoat = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this.database.trips.getByBoat(boatId).then(({ rows }) => res.send(rows))
  }

  getCurrent = (req: Request, res: Response) => {
    const boatId = req.params.boatId
    return this._getLatestByBoat(boatId)
      .then((tripId) => this._isOngoing(tripId).then((ongoing) => [tripId, ongoing]))
      .then(([tripId, ongoing]) => res.send({ tripId: tripId, ongoing: ongoing }))
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

  // --- PRIVATE ---

  _getLatestByBoat = (boatId: string) =>
    this.database.trips.getByBoat(boatId).then(({ rows }) => rows.reduce((max, i) => Math.max(max, i.id), 0))

  _isOngoing = (tripId: string) =>
    this.database.nmea.getLatestByTrip(tripId).then(({ rows }) => {
      const minutes15inMS = 1000 * 60 * 15
      if (!!rows && Date.now() - rows[0].max > minutes15inMS) return false
      else return true
    })
}

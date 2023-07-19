import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class NmeaData {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  getByTrip = (req: Request, res: Response) => {
    const tripId = req.params.tripId
    return this.database.nmea.getByTrip(tripId).then(({ rows }) => res.send(rows))
  }

  create = (req: Request, res: Response) => {
    const { timestamp, packet, tripId } = req.body
    const packetType = 'None' // TODO: Resolve packet types here!
    return this.database.nmea.create(timestamp, packetType, packet, tripId).then(() => res.status(201).send())
  }

  // TODO: delete
}

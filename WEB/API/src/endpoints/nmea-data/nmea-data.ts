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
    return this.database.nmea.getByTrip(tripId).then((data) => res.send(data.rows))
  }

  save = (req: Request, res: Response) => {
    const timestamp = ''
    const packet_type = '' // TODO: Needs to be resolved here! Create a function for it
    const packet_data = ''
    const trip_id = ''
    return this.database.nmea.save(timestamp, packet_type, packet_data, trip_id).then(() => res.status(201).send())
  }

  // TODO: delete
}

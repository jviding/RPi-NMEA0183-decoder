import express = require('express')
import Queries from '../../queries/queries'

type Request = typeof express.request
type Response = typeof express.response

export default class NmeaData {
  database: Queries

  constructor(database: Queries) {
    this.database = database
  }

  // get

  save = (req: Request, res: Response) => {
    const timestamp = ''
    const packet_type = '' // Needs to be resolved here! Create a function for it
    const packet_data = ''
    const boat_id = ''
    return this.database.nmea.save(timestamp, packet_type, packet_data, boat_id).then(() => res.status(201).send())
  }

  // delete
}

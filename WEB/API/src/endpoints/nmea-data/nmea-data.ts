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

  // TODO: Use node-cache? If consequtive writes exhaust the server
  // Test database speed with print(time) before and after the storage
  // TODO: Use connection: keep-alive, sockets, or something?
  // Then generate a TCP session specific secret for continuous delivery
  create = (req: Request, res: Response) => {
    const { timestamp, packet, tripId, token } = req.body
    const packetType = 'None' // TODO: Resolve packet types here!
    return this._validateTokenWithTrip(token, tripId)
      .then(() => this.database.nmea.create(timestamp, packetType, packet, tripId))
      .then(() => res.status(201).send())
  }

  // TODO: delete

  // --- PRIVATE ---

  _validateTokenWithTrip = (token: string, tripId: string) => {
    return Promise.all([this.database.boats.getByToken(token), this.database.trips.getByID(tripId)]).then(
      ([boatRes, tripRes]) => {
        if (boatRes.rows.length === 0) throw 'NMEA: Invalid token'
        if (tripRes.rows.length === 0) throw 'NMEA: Invalid tripId'
        const sameBoatID = boatRes.rows[0].id === tripRes.rows[0].boat_id
        if (!sameBoatID) throw 'NMEA: Mismatching token and tripId'
        return true
      }
    )
  }
}

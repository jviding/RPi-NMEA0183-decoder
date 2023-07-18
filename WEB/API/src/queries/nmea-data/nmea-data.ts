import postgres = require('pg')

export default class NmeaData {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  getByTrip = (tripId: string) =>
    this.database.query({
      text: 'SELECT timestamp, packet_type, packet_data FROM nmea_data WHERE trip_id=$1',
      values: [tripId]
    })

  create = (timestamp: string, nmeaType: string, nmeaData: string, tripId: string) =>
    this.database.query({
      text: 'INSERT INTO nmea_data(timestamp, packet_type, packet_data, trip_id) VALUES($1, $2, $3, $4)',
      values: [timestamp, nmeaType, nmeaData, tripId]
    })
}

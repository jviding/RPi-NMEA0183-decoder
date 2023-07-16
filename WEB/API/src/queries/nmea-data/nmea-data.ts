import postgres = require('pg')

export default class NmeaData {
  database: postgres.Pool

  constructor(database: postgres.Pool) {
    this.database = database
  }

  // get

  save = (timestamp: string, nmeaType: string, nmeaData: string, boatId: string) =>
    this.database.query({
      text: 'INSERT INTO nmea_data(timestamp, packet_type, packet_data, boat_id) VALUES($1, $2, $3, $4)',
      values: [timestamp, nmeaType, nmeaData, boatId]
    })
}

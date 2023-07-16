import Client = require('pg')

// USE ENV VARIABLES?? Supported: https://node-postgres.com/apis/client
const pool = new Client.Pool({
  user: 'username',
  password: 'password',
  host: 'localhost',
  database: 'nmea_data',
  port: 5432
})

const createUser = (username: String, password: String) => {
  const query = {

  }
}

const postNMEA = () => {
  const query = {
    text: 'INSERT INTO nmea_data() VALUES($1, $2, $3)'
  }

  pool.query('SELECT * FROM users', (err: Error, result: Result) => {
    if (err) {
      throw err
    }
    return result
  })
}

module.exports = {
  postNMEA
}

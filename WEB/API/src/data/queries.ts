import pg = require('pg')
//import QueryResult = require('pg')
//type Pool = typeof pg.Pool

interface IDatabase {
  //postUser(username: string, passwordHash: string): Promise<pg.QueryResult>
}

export default class Database implements IDatabase {
  pool: pg.Pool

  constructor() {
    //config: object) {
    this.pool = new pg.Pool({
      // config
      user: 'username',
      password: 'password',
      host: 'localhost',
      database: 'nmea_data',
      port: 5432
    })
  }

  /*postUser(username: string, passwordHash: string): Promise<pg.QueryResult> {
    const query = {
      text: 'INSERT INTO users(username, password) VALUES($1, $2)',
      values: [username, passwordHash]
    }
    return this.pool.query(query)
  }*/
}

//type DatabaseInstance = InstanceType<typeof Database>

// USE ENV VARIABLES?? Supported: https://node-postgres.com/apis/client
/*const pool = new Client.Pool({
  user: 'username',
  password: 'password',
  host: 'localhost',
  database: 'nmea_data',
  port: 5432
})*/

// getUser
// getUsers
// putUser
// deleteUser
/*const postUser = (username: string, passwordHash: string) => {
  const query = {
    text: 'INSERT INTO users(username, password) VALUES($1, $2)',
    values: [username, passwordHash]
  }
  pool.query(query)
}*/

// getBoat
// postBoat
// putBoat
// deleteBoat

// getNMEA
// postNMEA

/*
module.exports = {
  postUser
}*/

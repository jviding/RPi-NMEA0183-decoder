import bcrypt = require('bcrypt')

export function hash(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function compare(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject('Password: Invalid')
      else if (result) resolve(true)
      else reject('Password: Comparison failed')
    })
  })
}

import express = require('express')

type Request = typeof express.request
//type Response = typeof express.response

export function authenticate(req: Request, userId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) reject(`Auth: Session regeneration failed for user ${userId}`)
      req.session.user = userId
      req.session.save((err) => {
        if (err) reject(`Auth: Couldn't save session for user ${userId}`)
        resolve(true)
      })
    })
  })
}

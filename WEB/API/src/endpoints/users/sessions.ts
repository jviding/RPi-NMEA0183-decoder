import express = require('express')

type Request = typeof express.request
//type Response = typeof express.response

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}

export function createSession(req: Request, userId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) reject(`Auth: Session regeneration failed for user ${userId}`)
      req.session.userId = userId
      req.session.save((err) => {
        if (err) reject(`Auth: Couldn't save session for user ${userId}`)
        resolve(true)
      })
    })
  })
}

export function endSession(req: Request): Promise<boolean> {
  return new Promise((resolve, reject) => {
    req.session.userId = ''
    req.session.save((err) => {
      if (err) reject(`Auth: Session deletion failed for user`)
      req.session.regenerate((err) => {
        if (err) reject(`Auth: Session regeneration failed upon logout`)
        resolve(true)
      })
    })
  })
}

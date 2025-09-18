import {NextFunction, Request, Response} from 'express'
import { ObjectId } from 'mongodb'

import {School, Schools, SchoolWithId} from './schools.model'
import { ParamsWithId } from '@/interfaces/ParamsWithId'

// import {schools} from '@/data'

export const FindAll = async (
  req: Request,
  res: Response<SchoolWithId[]>,
  next: NextFunction
) => {
  try {
    const schools = await Schools.find().toArray()
    res.json(schools)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const InsertOne = async (
  req: Request<{}, SchoolWithId, School>,
  res: Response<SchoolWithId>,
  next: NextFunction
) => {
  try {
    const insertResult = await Schools.insertOne(req.body)
    if(!insertResult.acknowledged) throw new Error(`Insert failed`)
    res.status(201)
    res.json({
      ...req.body,
      _id: insertResult.insertedId
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
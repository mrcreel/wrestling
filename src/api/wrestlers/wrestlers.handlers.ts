import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

import {Wrestler, Wrestlers, WrestlerWithId} from './wrestlers.model'
import { ParamsWithId } from "@/interfaces/ParamsWithId";

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wrestlers = await Wrestlers.find().toArray()
    res.json(wrestlers)
  } catch (error) {
    next(error)
  }
}
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

import {School, Schools, SchoolWithId} from '../schools/schools.model'

import { schools } from "@/data"

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = schools.map((school: School) => {
      return school.wrestlers
    }).flat(Infinity)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
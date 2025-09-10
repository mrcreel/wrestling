import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import RequestValidators from "./interfaces/RequestValidators";

export const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404)
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
    next(error)
}

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if(validators.body) {
        req.baseUrl = await validators.body.parseAsync(req.body)
      }
      if(validators.params) {
        req.baseUrl = await validators.params.parseAsync(req.params)
      }
      if(validators.query) {
        req.baseUrl = await validators.query.parseAsync(req.query)
      }
      next()
    } catch (error) {
      if (error instanceof ZodError){
        res.status(422)
      }
      next(error)
    }
  }
}